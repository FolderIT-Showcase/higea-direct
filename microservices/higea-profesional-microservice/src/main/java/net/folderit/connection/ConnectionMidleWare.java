package net.folderit.connection;

import net.folderit.converters.DataCoreDTO;
import net.folderit.converters.ProfesionalCoreDTO;
import net.folderit.dto.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ConnectionMidleWare {

    //http://higea.folderit.net

    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/profesionales";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {


        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");

        // send request and parse result

        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);

        return ResponseEntity.ok(result);

    }


    public ProfesionalDataDTO profesionales(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();


        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);


        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);


        ResponseEntity<ProfesionalDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, ProfesionalDTO.class, uriParams);


        return result.getBody().getData();
        /*return result;*/
    }

    public List<ProfesionalCoreDTO> profesionalesCore(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();


        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);


        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);


        ResponseEntity<ProfesionalDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, ProfesionalDTO.class, uriParams);

        List<ProfesionalCoreDTO> profesionalCoreDTOS = new ArrayList<>();

        for (Iterator<RowProfesionalDTO> i = result.getBody().getData().getRows().iterator(); i.hasNext();) {
            RowProfesionalDTO item = i.next();
            profesionalCoreDTOS.add(item.converterRoProfesionalCore());
        }
        DataCoreDTO dataCoreDTO = new DataCoreDTO();

        dataCoreDTO.setData(profesionalCoreDTOS);
        return profesionalCoreDTOS;
        /*return result;*/
    }
}
