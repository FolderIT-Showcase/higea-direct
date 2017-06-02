package net.folderit.connection;

import net.folderit.domain.core.Persona;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResultHigea;
import net.folderit.domain.higea.PacienteHigea;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private final String uriLogin = "http://higea.folderit.net/api/login";
    private final String uriPaciente = "http://higea.folderit.net/api/{cliente}/pacientes";
    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    public PacienteHigea savePaciente(String codigo, Persona persona) {

        PacienteHigea dto = persona.convertToPacienteHigeaDTO();
        ResponseEntity<LoginResultHigea> loginResultDTO = login();

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());

        RestTemplate restTemplate = new RestTemplate();
        //restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

        HttpEntity<?> request = new HttpEntity<>(dto, headers);

        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        ResponseEntity<PacienteHigea> result = restTemplate.postForEntity(uriPaciente, request, PacienteHigea.class, uriParams);
        return result.getBody();
    }


}