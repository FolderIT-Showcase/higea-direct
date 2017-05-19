package net.folderit.connection;

import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import net.folderit.dto.*;
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

    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriTurnos = "http://higea.folderit.net/api/{cliente}/turnos";
    final String uriProfesionales = "http://localhost:36001/{cliente}";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);

    }


    public TurnoDataDTO turnos(String codigo,FilterDto filterDto) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<TurnoDTO> result = restTemplate.exchange(getFilterURIEspecialidad(filterDto), HttpMethod.GET, entity, TurnoDTO.class, uriParams);

        return result.getBody().getData();
    }


    private ArrayList<Profesional> getProfesionales(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<ArrayList<Profesional>> result =
                restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, new ParameterizedTypeReference<ArrayList<Profesional>>() {
                }, uriParams);
        ArrayList<Profesional> tmp = new ArrayList<>();
        tmp.addAll(result.getBody());
        return tmp;

    }

    public List<Turno> finAllBy(String codigo, FilterDto filter) {


        TurnoDataDTO result = turnos(codigo,filter);

        ArrayList<RowTurnoDTO> turnosHigea = new ArrayList<>();
        turnosHigea.addAll(result.getRows());
        ArrayList<Turno> turnosCore = new ArrayList<>(turnosHigea.size());

        List<Profesional>  profesionales = getProfesionales(codigo);

        turnosHigea.forEach(x -> turnosCore.add(x.convert(profesionales)));

        return turnosCore;
    }

    public String getFilterURIEspecialidad(FilterDto filterDto){
        String filter=uriTurnos;
        filter+="?"+filterDto.getFilterParameters();
        return filter;
    }


}
