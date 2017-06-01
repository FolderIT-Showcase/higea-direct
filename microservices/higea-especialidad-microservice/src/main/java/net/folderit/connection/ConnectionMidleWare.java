package net.folderit.connection;

import net.folderit.domain.core.Especialidad;
import net.folderit.domain.higea.EspecialidadHigea;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResultHigea;
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


    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/especialidades";
    final String uriProfesionales = "http://localhost:36001/{cliente}/profesionales";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    private List<ProfesionalHigea> getProfesionales(String codigo, HttpEntity<?> entity) {

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        // send request and parse result
        ResponseEntity<Result<ProfesionalHigea>> result =
                restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, new ParameterizedTypeReference<Result<ProfesionalHigea>>() {
                }, uriParams);

        return result.getBody().getData().getRows();

    }


    public List<Especialidad> especialidades(String codigo) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        List<ProfesionalHigea> profesionales = this.getProfesionales(codigo, entity);

        ResponseEntity<Result<EspecialidadHigea>> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET,
                entity, new ParameterizedTypeReference<Result<EspecialidadHigea>>() {
                }, uriParams);

        ArrayList<Especialidad> especialidades = new ArrayList<>();

        List<EspecialidadHigea> mEspecialidades = result.getBody().getData().getRows();

        mEspecialidades.forEach(x -> {
            Especialidad mEspecialidad = x.convertToEspecialidadCoreDTO();

            profesionales.forEach(y -> {
                if (mEspecialidad.getId().intValue() == y.getEspecialidad_id()) {
                    if (mEspecialidad.getProfesional() == null) {
                        mEspecialidad.setProfesional(new ArrayList<>());
                    }
                    mEspecialidad.getProfesional().add(y.convert());
                }
            });

            especialidades.add(mEspecialidad);
        });

        return especialidades;
    }
}
