package net.folderit.higeapacientemicroservice.connection;

import net.folderit.domain.core.Persona;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResult;
import net.folderit.domain.higea.PacienteHigea;
import net.folderit.domain.higea.Result;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private final String uriPaciente = "http://higea.folderit.net/api/{cliente}/pacientes";
    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResult> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResult result = restTemplate.postForObject(uriLogin, loginDTO, LoginResult.class);
        return ResponseEntity.ok(result);
    }

    public Persona savePaciente(String codigo, Persona persona) {
        PacienteHigea dto = persona.convertToPacienteHigeaDTO();
        ResponseEntity<LoginResult> loginResultDTO = login();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity entity = new HttpEntity<>(dto, headers);
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        String uriPaciente = "http://higea.folderit.net/api/{cliente}/pacientes";
        ResponseEntity<Result<PacienteHigea>> result = restTemplate.exchange(uriPaciente, HttpMethod.POST, entity, new ParameterizedTypeReference<Result<PacienteHigea>>() {
        }, uriParams);
        PacienteHigea pacienteResultHigea = result.getBody().getData().getRows().get(0);
        persona.setExternalId(pacienteResultHigea.getPaciente_id());
        return persona;
    }


}
