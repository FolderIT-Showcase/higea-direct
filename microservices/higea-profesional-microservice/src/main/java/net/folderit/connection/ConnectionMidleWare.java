package net.folderit.connection;

import net.folderit.converters.DataCoreDTO;
import net.folderit.domain.Profesional;
import net.folderit.dto.LoginDTO;
import net.folderit.dto.LoginResultDTO;
import net.folderit.dto.ProfesionalDTO;
import net.folderit.dto.RowProfesionalDTO;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private final String uriLogin = "http://higea.folderit.net/api/login";
    private final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/profesionales";
    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);
    }

    public List<Profesional> getProfesionales(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<ProfesionalDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, ProfesionalDTO.class, uriParams);
        ArrayList<Profesional> profesionales = new ArrayList<>();

        List<RowProfesionalDTO> mList = result.getBody().getData().getRows();

        mList.forEach(x -> profesionales.add(x.converterRoProfesionalCore()));

        return profesionales;
    }

    public List<RowProfesionalDTO> getProfesionalesHigea(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<ProfesionalDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, ProfesionalDTO.class, uriParams);
        ArrayList<Profesional> profesionales = new ArrayList<>();

        List<RowProfesionalDTO> mList = result.getBody().getData().getRows();

        return mList;
    }


}
