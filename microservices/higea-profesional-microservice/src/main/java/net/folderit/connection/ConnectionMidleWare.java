package net.folderit.connection;

import net.folderit.domain.core.Profesional;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResult;
import net.folderit.domain.higea.ProfesionalHigea;
import net.folderit.domain.higea.Result;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConnectionMidleWare {

    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResult> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResult result = restTemplate.postForObject(uriLogin, loginDTO, LoginResult.class);
        return ResponseEntity.ok(result);
    }

    public List<Profesional> getProfesionales(String codigo) {
        List<ProfesionalHigea> profesionalesHigea = getProfesionalesHigea(codigo);
        List<Profesional> profesionales = new ArrayList<>();
        profesionalesHigea.forEach(x -> profesionales.add(x.convert()));
        return profesionales;
    }

    public List<ProfesionalHigea> getProfesionalesHigea(String codigo) {

        ResponseEntity<LoginResult> loginResultDTO = login();

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/profesionales";
        ResponseEntity<Result<ProfesionalHigea>> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<ProfesionalHigea>>() {
                }, uriParams);

        return result.getBody().getData().getRows();
    }


}
