package net.folderit.connection;

import net.folderit.domain.core.Profesional;
import net.folderit.domain.core.Turno;
import net.folderit.domain.higea.Result;
import net.folderit.domain.higea.TurnoHigea;
import net.folderit.dto.FilterDto;
import net.folderit.service.HigeaApiConnect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConnectionMidleWare {

    private final String uriTurnos = "http://higea.folderit.net/api/{cliente}/turnos";
    private final HigeaApiConnect higeaApiConnect;
    private final RestTemplate restTemplate = new RestTemplate();

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
        ResponseEntity<ArrayList<TurnoHigea>> result = higeaApiConnect.get(uriTurnos + "/" + pacienteId, new ParameterizedTypeReference<ArrayList<TurnoHigea>>() { });
        List<Turno> turnosCore = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales();
        result.getBody().forEach(turno -> turnosCore.add(turno.convert(profesionales)));
        return turnosCore;
    }

    private String getFilterURIEspecialidad(FilterDto filterDto) {
        String filter = uriTurnos;
        filter += "?" + filterDto.getFilterParameters();
        return filter;
    }

    public Turno save(String codigo, Turno turno, int pacienteId) {
        TurnoHigea turnoHigea = turno.convertHigea();
        turnoHigea.setPaciente_id((long) pacienteId);
        ResponseEntity<TurnoHigea> result = higeaApiConnect.post(uriTurnos,new ParameterizedTypeReference<TurnoHigea>() {});
        List<Profesional> profesionales = getProfesionales();
        return result.getBody().convert(profesionales);
    }

}
