package net.folderit.service;

import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResultHigea;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class HigeaApiConnect {
    @Value("${turnero.client.label}")
    private String cliente;
    private RestTemplate restTemplate = new RestTemplate();
    private Map<String, String> uriParams = new HashMap<>();

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String url = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(url, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    private HttpEntity<?> getSession() {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        uriParams.put("cliente", cliente);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        return new HttpEntity<>(headers);
    }

    public <T> ResponseEntity<T> get(String url, ParameterizedTypeReference<T> responseType) {
        return restTemplate.exchange(url, HttpMethod.GET, getSession(), responseType, uriParams);
    }

    public <T> ResponseEntity<T> post(String url, ParameterizedTypeReference<T> responseType, Object body) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        uriParams.put("cliente", cliente);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new  HttpEntity<>(body, headers);

        return restTemplate.exchange(url, HttpMethod.POST, entity, responseType, uriParams);
    }
}
