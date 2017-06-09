package net.folderit.connection;

import net.folderit.domain.core.Profesional;
import net.folderit.domain.core.Turno;
import net.folderit.domain.higea.EstadoTurnosHigea;
import net.folderit.domain.higea.Result;
import net.folderit.domain.higea.TurnoHigea;
import net.folderit.dto.FilterDto;
import net.folderit.service.HigeaApiConnect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ConnectionMidleWare {

    private final String uriTurnos = "http://higea.folderit.net/api/{cliente}/turnos";
    private final HigeaApiConnect higeaApiConnect;
    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${turnero.client.label}")
    private String cliente;

    @Autowired
    public ConnectionMidleWare(HigeaApiConnect higeaApiConnect) {
        this.higeaApiConnect = higeaApiConnect;
    }

    private List<TurnoHigea> turnos(String codigo, FilterDto filterDto) {
        String url = getFilterURIEspecialidad(filterDto);
        System.out.println(url);
        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<TurnoHigea>>() {
        });
        return result.getBody().getData().getRows();
    }


    private List<Profesional> getProfesionales() {
        String uriProfesionales = "http://localhost:36000/profesional";
        ResponseEntity<ArrayList<Profesional>> result = higeaApiConnect.get(uriProfesionales, new ParameterizedTypeReference<ArrayList<Profesional>>() {});
        return result.getBody();
    }

    public List<Turno> findAllBy(String codigo, FilterDto filter) {
        List<TurnoHigea> turnosHigea = turnos(codigo, filter);
        List<Turno> turnosCore = new ArrayList<>(turnosHigea.size());
        List<Profesional> profesionales = getProfesionales();
        turnosHigea.forEach(x -> turnosCore.add(x.convert(profesionales)));
        return turnosCore;
    }

    public List<Turno> findAllByPersona(Integer pacienteId) {
        String url = "http://higea.folderit.net/api/" + cliente + "/turnos";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("paciente_id", pacienteId);

        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(builder.build().encode().toUri().toString(),
                new ParameterizedTypeReference<Result<TurnoHigea>>() {
                });
        List<Turno> turnosCore = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales();
        result.getBody().getData().getRows().forEach(turno -> turnosCore.add(turno.convert(profesionales)));
        return turnosCore;
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
        return result.getBody().getData().getRows().get(0).convert(profesionales);
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

        String url = "http://higea.folderit.net/api/" + cliente + "/agendas";

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
                turnosCoreLibres.add(turnoHigea.convert(profesionales));
            }
        });

        return turnosCoreLibres;
    }

    public List<EstadoTurnosHigea> findEstadosTurnos(String codigo) {

        String url = "http://higea.folderit.net/api/" + cliente + "/estadoTurnos";

        ResponseEntity<Result<EstadoTurnosHigea>> result = higeaApiConnect.get(url,
                new ParameterizedTypeReference<Result<EstadoTurnosHigea>>() {
                });
        return result.getBody().getData().getRows();
    }

}
