package net.folderit.connection;

import net.folderit.domain.core.MotivoTurno;
import net.folderit.domain.core.Profesional;
import net.folderit.domain.core.Turno;
import net.folderit.domain.higea.*;
import net.folderit.dto.FilterDto;
import net.folderit.service.CoreApiConnect;
import net.folderit.service.HigeaApiConnect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ConnectionMidleWare {

    private final String uriTurnos = "https://higea.folderit.net/api/{cliente}/turnos";
    private final HigeaApiConnect higeaApiConnect;
    private final CoreApiConnect coreApiConnect;
    @Value("${turnero.client.label}")
    private String cliente;

    @Autowired
    public ConnectionMidleWare(HigeaApiConnect higeaApiConnect, CoreApiConnect coreApiConnect) {
        this.higeaApiConnect = higeaApiConnect;
        this.coreApiConnect = coreApiConnect;
    }

    private List<TurnoHigea> turnos(String codigo, FilterDto filterDto) {
        String url = getFilterURIEspecialidad(filterDto);
        System.out.println(url);
        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<TurnoHigea>>() {
        });
        return result.getBody().getData().getRows();
    }

    private List<Profesional> getProfesionales() {
        String uriProfesionales = "http://localhost:36000/metadata/profesional";
        ResponseEntity<ArrayList<Profesional>> result = coreApiConnect.get(uriProfesionales, new ParameterizedTypeReference<ArrayList<Profesional>>() {
        });
        return result.getBody();
    }

    public List<Turno> findAllBy(String codigo, FilterDto filter) {
        List<TurnoHigea> turnosHigea = turnos(codigo, filter);
        List<Turno> turnosCore = new ArrayList<>(turnosHigea.size());
        List<Profesional> profesionales = getProfesionales();

        for (TurnoHigea turnoHigea : turnosHigea) {
            MotivoTurno motivoTurno = getMotivoTurno(turnoHigea.getTurno_tipo_turno());
            turnosCore.add(turnoHigea.convert(profesionales, motivoTurno));
        }

        return turnosCore;
    }

    public List<Turno> findAllByPersona(Integer pacienteId) {
        String url = "https://higea.folderit.net/api/" + cliente + "/turnos";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("paciente_id", pacienteId);

        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(builder.build().encode().toUri().toString(),
                new ParameterizedTypeReference<Result<TurnoHigea>>() {
                });
        List<Turno> turnosCore = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales();

        for (TurnoHigea turnoHigea : result.getBody().getData().getRows()) {
            MotivoTurno motivoTurno = getMotivoTurno(turnoHigea.getTurno_tipo_turno());
            turnosCore.add(turnoHigea.convert(profesionales, motivoTurno));
        }

        return turnosCore;
    }

    private MotivoTurno getMotivoTurno(Long motivoTurnoHigeaId) {
        if (motivoTurnoHigeaId == null) return null;
        String uriProfesionales = "http://localhost:36000/metadata/motivoTurno/" + motivoTurnoHigeaId;
        ResponseEntity<MotivoTurno> result = coreApiConnect.get(uriProfesionales, new ParameterizedTypeReference<MotivoTurno>() {
        });
        return result.getBody();
    }

    private String getFilterURIEspecialidad(FilterDto filterDto) {
        String filter = uriTurnos;
        filter += "?" + filterDto.getFilterParameters();
        return filter;
    }

    public Turno otorgarTurno(String codigo, Turno turno, int pacienteId) {
        TurnoHigea turnoHigea = turno.convertHigea(getOtorgado(codigo), (long) pacienteId);
        turnoHigea.setPaciente_id((long) pacienteId);

        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.post(uriTurnos, new ParameterizedTypeReference<Result<TurnoHigea>>() {
        }, turnoHigea);

        List<Profesional> profesionales = getProfesionales();
        System.out.println(result);
        Long tipoTurno = result.getBody().getData().getRows().get(0).getTurno_tipo_turno();
        MotivoTurno motivoTurno = getMotivoTurno(tipoTurno);

        Turno mTurno = result.getBody().getData().getRows().get(0).convert(profesionales, motivoTurno);
        return mTurno;
    }

    private Long getOtorgado(String codigo) {
        List<EstadoTurnosHigea> estados = findEstadosTurnos(codigo);
        Long id = null;
        for (EstadoTurnosHigea estado : estados) {
            if (estado.getEstado_turno_nombre().equals("Otorgado")) {
                return estado.getEstado_turno_id();
            }
        }
        return null;
    }

    private List<TurnoHigea> findTurnos(Long profesionalId, Date fecha) {

        String url = "https://higea.folderit.net/api/" + cliente + "/agendas";

        if (profesionalId == null || fecha == null) {
            return new ArrayList<>();
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fechaStr = simpleDateFormat.format(fecha);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("profesional_id", profesionalId)
                .queryParam("agenda_fecha", fechaStr);

        System.out.println(builder.build().encode().toUri().toString());

        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(builder.build().encode().toUri().toString(),
                new ParameterizedTypeReference<Result<TurnoHigea>>() {
                });

        return result.getBody().getData().getRows();
    }

    public List<Turno> findTurnosLibres(FilterDto filterDto) {
        List<TurnoHigea> turnosHigea = findTurnos(filterDto.getProfesional().getId(), filterDto.getFecha());
        List<Turno> turnosCoreLibres = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales();

        turnosHigea.forEach(turnoHigea -> {
            if (turnoHigea.getPaciente_id() == null) {
                MotivoTurno motivoTurno = getMotivoTurno(turnoHigea.getTurno_tipo_turno());
                turnosCoreLibres.add(turnoHigea.convert(profesionales, motivoTurno));
            }
        });

        return turnosCoreLibres;
    }

    public List<EstadoTurnosHigea> findEstadosTurnos(String codigo) {

        String url = "https://higea.folderit.net/api/" + cliente + "/estadoTurnos";

        ResponseEntity<Result<EstadoTurnosHigea>> result = higeaApiConnect.get(url,
                new ParameterizedTypeReference<Result<EstadoTurnosHigea>>() {
                });
        return result.getBody().getData().getRows();
    }

    public List<CalendarioDataHigea> findCalendarios(String codigo, String profesional_id, String servicio_id, String calendario_fecha) {

        String url = "https://higea.folderit.net/api/" + cliente + "/calendario" + "?" + "profesional_id=" + profesional_id + "&servicio_id=" + servicio_id + "&calendario_fecha=" + calendario_fecha;

        ResponseEntity<CalendarioHigea> result = higeaApiConnect.get(url,
                new ParameterizedTypeReference<CalendarioHigea>() {
                });
        return result.getBody().getData();
    }


}
