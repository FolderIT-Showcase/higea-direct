package net.folderit.connection;

import net.folderit.domain.core.Persona;
import net.folderit.dto.LoginDTO;
import net.folderit.dto.LoginResultDTO;
import net.folderit.dto.PacienteDTO;
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

    private ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);
    }


    public Persona savePaciente(String codigo, Persona persona) {

        PacienteDTO dto = persona.convertToPacienteHigeaDTO();

        ResponseEntity<LoginResultDTO> loginResultDTO = login();

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());

        RestTemplate restTemplate = new RestTemplate();
        //restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

        HttpEntity<?> request = new HttpEntity<>(dto, headers);

        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        PacienteDTO response = restTemplate.postForObject(uriPaciente, request, PacienteDTO.class, uriParams);

        return persona;
    }


}
