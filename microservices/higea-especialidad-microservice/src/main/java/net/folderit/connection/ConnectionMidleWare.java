package net.folderit.connection;

import net.folderit.domain.core.Especialidad;
import net.folderit.domain.core.Profesional;
import net.folderit.domain.higea.*;
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

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    private List<ProfesionalHigea> getProfesionales(String codigo, HttpEntity<?> entity) {

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        // send request and parse result
        String uriProfesionales = "http://localhost:36001/{cliente}/profesionales";
        ResponseEntity<List<ProfesionalHigea>> result =
                restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, new ParameterizedTypeReference<List<ProfesionalHigea>>() {
                }, uriParams);

        return result.getBody();

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

        String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/especialidades";
        ResponseEntity<Result<EspecialidadHigea>> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET,
                entity, new ParameterizedTypeReference<Result<EspecialidadHigea>>() {
                }, uriParams);

        ArrayList<Especialidad> especialidades = new ArrayList<>();

        List<EspecialidadHigea> mEspecialidades = result.getBody().getData().getRows();

        mEspecialidades.forEach(especialidad -> {
            Especialidad mEspecialidad = especialidad.convert();
            List<Profesional> profesionalesTmp = new ArrayList<>();

            profesionales.forEach(profesional -> {
                if (mEspecialidad.getId().intValue() == profesional.getEspecialidad_id()) {
                    if (mEspecialidad.getProfesional() != null) {
                        profesionalesTmp.add(profesional.convert());
                    }

                }
            });

            mEspecialidad.setProfesional(profesionalesTmp);
            especialidades.add(mEspecialidad);
        });

        return especialidades;
    }
}
