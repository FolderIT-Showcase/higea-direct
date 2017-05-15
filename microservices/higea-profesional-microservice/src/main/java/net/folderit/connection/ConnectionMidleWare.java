package net.folderit.connection;


import net.folderit.dto.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by luis on 12/05/17.
 */
@Service
public class ConnectionMidleWare {

    //http://higea.folderit.net

    private RestTemplate restTemplate = new RestTemplate();

    final String uriLogin = "http://higea.folderit.net/api/login";

    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/profesionales";


    public ResponseEntity<LoginResultDTO> login(){



        LoginDTO loginDTO = new LoginDTO("turneroweb","WroteScientistFarmerCarbon");

        // send request and parse result

        LoginResultDTO result= restTemplate.postForObject(uriLogin, loginDTO,LoginResultDTO.class);

        return ResponseEntity.ok(result);

    }


    public ProfesionalDataDTO profesionales(String codigo){

        ResponseEntity<LoginResultDTO>  loginResultDTO = login();



        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);


        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        //ResponseEntity<ProfesionalDTO> result=  restTemplate.getForObject(uriEspecialidad ,entity, ProfesionalDTO.class,uriParams);

      ResponseEntity<ProfesionalDTO> result=  restTemplate.exchange(uriEspecialidad ,HttpMethod.GET,entity, ProfesionalDTO.class,uriParams);

        return result.getBody().getData();
        /*return result;*/
    }
}
