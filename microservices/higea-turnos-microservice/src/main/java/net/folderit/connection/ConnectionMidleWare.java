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

import java.util.ArrayList;
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
        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(getFilterURIEspecialidad(filterDto), new ParameterizedTypeReference<Result<TurnoHigea>>() {
        });
        return result.getBody().getData().getRows();
    }


    private List<Profesional> getProfesionales() {
        String uriProfesionales = "http://localhost:36001/{cliente}";
        ResponseEntity<ArrayList<Profesional>> result = higeaApiConnect.get(uriProfesionales, new ParameterizedTypeReference<ArrayList<Profesional>>() {
        });
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

        TurnoHigea turnoHigea = turno.convertHigea(getOtorgado(codigo));
        turnoHigea.setPaciente_id((long) pacienteId);
        ResponseEntity<TurnoHigea> result = higeaApiConnect.post(uriTurnos, new ParameterizedTypeReference<TurnoHigea>() {
        });
        List<Profesional> profesionales = getProfesionales();
        return result.getBody().convert(profesionales);
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


    private List<TurnoHigea> findTurnos(Integer profesionalId, Integer servicioId, Integer planId, String fecha) {

        String url = "http://higea.folderit.net/api/" + cliente + "/agendas";

        if (profesionalId == null || fecha == null) {
            return new ArrayList<>();
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("profesional_id", profesionalId)
                .queryParam("agenda_fecha", fecha);

        if (servicioId != null) {
            builder.queryParam("servicio_id", servicioId);
        }

        if (planId != null) {
            builder.queryParam("plan_os_id", planId);
        }

        ResponseEntity<Result<TurnoHigea>> result = higeaApiConnect.get(builder.build().encode().toUri().toString(),
                new ParameterizedTypeReference<Result<TurnoHigea>>() {
                });

        return result.getBody().getData().getRows();
    }

    public List<Turno> findTurnosLibres(Integer profesionalId, Integer servicioId, Integer planId, String fecha) {
        List<TurnoHigea> turnosHigea = findTurnos(profesionalId, servicioId, planId, fecha);
        List<Turno> turnosCoreLibres = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales();

        turnosHigea
                .stream()
                .filter(turnoHigea -> turnoHigea.getPaciente_id() != null)
                .forEach(turnoHigea -> turnosCoreLibres.add(turnoHigea.convert(profesionales)));

        return turnosCoreLibres;
    }

    public List<EstadoTurnosHigea> findEstadosTurnos(String codigo){

        String url = "http://higea.folderit.net/api/" + cliente + "/estadoTurnos";

        ResponseEntity<Result<EstadoTurnosHigea>> result = higeaApiConnect.get(url,
                new ParameterizedTypeReference<Result<EstadoTurnosHigea>>() {
                });
       return result.getBody().getData().getRows();
    }

}
