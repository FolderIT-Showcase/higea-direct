package net.folderit.connection;

import net.folderit.domain.core.Persona;
import net.folderit.domain.higea.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    public Persona savePaciente(String codigo, Persona persona) {

        PacienteHigea dto = persona.convertToPacienteHigeaDTO();
        ResponseEntity<LoginResultHigea> loginResultDTO = login();

       /* MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        headers.set("Authorization", loginResultDTO.getBody().getToken());*/



        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        //headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.setContentType(MediaType.APPLICATION_JSON);
        //headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(dto,headers);


        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        String uriPaciente = "http://higea.folderit.net/api/{cliente}/pacientes";
        ResponseEntity<PacienteHigea> result = restTemplate.postForEntity(uriPaciente, entity, PacienteHigea.class, uriParams);

        /*ResponseEntity<Result<PacienteHigea>> result = restTemplate.exchange(uriPaciente, HttpMethod.POST, entity,
                new ParameterizedTypeReference<Result<PacienteHigea>>() {
                }, uriParams);*/
        return persona;
    }


}
