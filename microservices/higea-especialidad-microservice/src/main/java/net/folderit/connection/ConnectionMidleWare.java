package net.folderit.connection;

import net.folderit.converters.EspecialidadCoreDTO;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.dto.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ConnectionMidleWare {


    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/especialidades";
    final String uriProfesionales = "http://localhost:36001/{cliente}/profesional";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {


        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");

        // send request and parse result

        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);

        return ResponseEntity.ok(result);

    }

    private ArrayList<RowProfesionalDTO> getProfesionales(String codigo, HttpEntity<?> entity) {

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        // send request and parse result
        ResponseEntity<ArrayList<RowProfesionalDTO>> result =
                restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, new ParameterizedTypeReference<ArrayList<RowProfesionalDTO>>(){}, uriParams);

        return result.getBody();

    }


    public List<Especialidad> especialidades(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();

        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ArrayList<RowProfesionalDTO> profesionales = this.getProfesionales(codigo, entity);

        ResponseEntity<EspecialidadDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, EspecialidadDTO.class, uriParams);

        ArrayList<Especialidad> especialidades = new ArrayList<>();

        List<EspecialidadesRow> mEspecialidades = result.getBody().getData().getRows();

        mEspecialidades.forEach( x -> {
            Especialidad mEspecialidad = x.convertToEspecialidadCoreDTO();

            profesionales.forEach( y -> {
                if (mEspecialidad.getId().intValue() == y.getEspecialidad_id()) {
                    if (mEspecialidad.getProfesional() == null) {
                        mEspecialidad.setProfesional(new ArrayList<>());
                    }
                    mEspecialidad.getProfesional().add(y.converterToProfesionalCore());
                }
            });

            especialidades.add(mEspecialidad);
        });

        return especialidades;
    }
}
