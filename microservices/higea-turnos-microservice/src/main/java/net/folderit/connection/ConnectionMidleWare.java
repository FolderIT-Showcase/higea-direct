package net.folderit.connection;

import net.folderit.dto.LoginDTO;
import net.folderit.dto.LoginResultDTO;
import net.folderit.dto.TurnoDTO;
import net.folderit.dto.TurnoDataDTO;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/turnos";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);

    }


    public TurnoDataDTO turnos(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<TurnoDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, TurnoDTO.class, uriParams);

        return result.getBody().getData();
    }
}
