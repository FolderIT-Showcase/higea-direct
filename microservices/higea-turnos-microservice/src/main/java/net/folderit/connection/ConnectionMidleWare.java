package net.folderit.connection;

import net.folderit.domain.core.Profesional;
import net.folderit.domain.core.Turno;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResultHigea;
import net.folderit.domain.higea.Result;
import net.folderit.domain.higea.TurnoHigea;
import net.folderit.dto.FilterDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private final String uriTurnos = "http://higea.folderit.net/api/{cliente}/turnos";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    private List<TurnoHigea> turnos(String codigo, FilterDto filterDto) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<Result<TurnoHigea>> result = restTemplate.exchange(getFilterURIEspecialidad(filterDto), HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<TurnoHigea>>() {
                }, uriParams);

        return result.getBody().getData().getRows();
    }


    private ArrayList<Profesional> getProfesionales(String codigo) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        String uriProfesionales = "http://localhost:36001/{cliente}";
        ResponseEntity<ArrayList<Profesional>> result =
                restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, new ParameterizedTypeReference<ArrayList<Profesional>>() {
                }, uriParams);
        ArrayList<Profesional> tmp = new ArrayList<>();
        tmp.addAll(result.getBody());
        return tmp;

    }

    public List<Turno> finAllBy(String codigo, FilterDto filter) {

        List<TurnoHigea> turnosHigea = turnos(codigo, filter);
        List<Turno> turnosCore = new ArrayList<>(turnosHigea.size());
        List<Profesional> profesionales = getProfesionales(codigo);

        turnosHigea.forEach(x -> turnosCore.add(x.convert(profesionales)));

        return turnosCore;
    }

    public List<Turno> findAllByPersona(String codigo, Integer pacienteId) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<ArrayList<TurnoHigea>> result =
                restTemplate.exchange(uriTurnos + "/" + pacienteId, HttpMethod.GET, entity,
                        new ParameterizedTypeReference<ArrayList<TurnoHigea>>() {
                        }, uriParams);

        List<Turno> turnosCore = new ArrayList<>();
        List<Profesional> profesionales = getProfesionales(codigo);
        result.getBody().forEach(turno -> turnosCore.add(turno.convert(profesionales)));

        return turnosCore;
    }

    public String getFilterURIEspecialidad(FilterDto filterDto) {
        String filter = uriTurnos;
        filter += "?" + filterDto.getFilterParameters();
        return filter;
    }

    public Turno save(String codigo, Turno turno, int pacienteId) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        TurnoHigea turnoHigea = turno.convertHigea();
        turnoHigea.setPaciente_id((long) pacienteId);

        ResponseEntity<TurnoHigea> result = restTemplate.postForEntity(uriTurnos, turnoHigea, TurnoHigea.class, uriParams);
        List<Profesional> profesionales = getProfesionales(codigo);
        return result.getBody().convert(profesionales);
    }

}
