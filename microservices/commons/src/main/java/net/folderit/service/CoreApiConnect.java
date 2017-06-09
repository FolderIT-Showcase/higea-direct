package net.folderit.service;

import net.folderit.domain.core.Login;
import net.folderit.domain.higea.LoginResult;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class CoreApiConnect {

    private RestTemplate restTemplate = new RestTemplate();
    private Map<String, String> uriParams = new HashMap<>();

    private ResponseEntity<LoginResult> login() {
        Login login = new Login("HigeaDirect", "alagrandelepusecuca2017");
        // send request and parse result
        String url = "http://localhost:36000/login";
        ResponseEntity<Void> result = restTemplate.postForEntity(url, login, Void.class);
        LoginResult loginResult = new LoginResult();
        String token = result.getHeaders().get("Authorization").get(0);
        loginResult.setToken(token);
        return ResponseEntity.ok(loginResult);
    }

    private HttpEntity<?> getSession() {
        ResponseEntity<LoginResult> loginResultDTO = login();
        // URI (URL) parameters
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        return new HttpEntity<>(headers);
    }

    public <T> ResponseEntity<T> get(String url, ParameterizedTypeReference<T> responseType) {
        return restTemplate.exchange(url, HttpMethod.GET, getSession(), responseType, uriParams);
    }

    public <T> ResponseEntity<T> post(String url, ParameterizedTypeReference<T> responseType, Object body) {
        ResponseEntity<LoginResult> loginResultDTO = login();
        // URI (URL) parameters
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new  HttpEntity<>(body, headers);

        return restTemplate.exchange(url, HttpMethod.POST, entity, responseType, uriParams);
    }
}
