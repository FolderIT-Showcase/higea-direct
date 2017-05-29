package net.folderit.service;

import net.folderit.domain.ObraSocial;
import net.folderit.domain.Plan;
import net.folderit.domain.TipoTurno;
import net.folderit.dto.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MetadataService {

    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriObrasSociales = "http://higea.folderit.net/api/{cliente}/obrasSociales";
    final String uriPlanesObraSocial = "http://higea.folderit.net/api/{cliente}/planesObraSocial";
    final String uriTipoTurnoFac = "http://higea.folderit.net/api/{cliente}/tipoTurnoFac";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);

    }

    public ArrayList<PlanObraSocialHigea> findAllPlanesObrasSociales(HttpEntity<?> entity, Map<String, String> uriParams) {
        ResponseEntity<Result<PlanObraSocialHigea>> result = restTemplate.exchange(uriPlanesObraSocial, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<PlanObraSocialHigea>>() {
                }, uriParams);

        System.out.println(result.getBody().getData().getRows());

        return new ArrayList<>(result.getBody().getData().getRows());
    }


    public List<ObraSocial> findAllObrasSociales(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ArrayList<PlanObraSocialHigea> todosLosPlanes = findAllPlanesObrasSociales(entity, uriParams);

        ResponseEntity<Result<ObraSocialHigea>> result = restTemplate.exchange(uriObrasSociales, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<ObraSocialHigea>>() {
                }, uriParams);

        ArrayList<ObraSocial> obrasSociales = new ArrayList<>();

        System.out.println(result.getBody().getData().getRows());

        result.getBody().getData().getRows().forEach(obraSocial -> {

            List<PlanObraSocialHigea> planesHigea = todosLosPlanes.stream().filter(plan ->
                    plan.getObra_social_id() == obraSocial.getObra_social_id()).collect(Collectors.toList());

            System.out.println(planesHigea);

            List<Plan> planes = new ArrayList<>();

            planesHigea.forEach(p -> planes.add(p.convert()));

            ObraSocial obraSocialTmp = obraSocial.convert();
            obraSocialTmp.setPlanes(planes);
            obrasSociales.add(obraSocialTmp);
        });

        return obrasSociales;
    }

    public List<TipoTurno> findTiposTurnoFac(String codigo) {
        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<Result<TipoTurnoFac>> result = restTemplate.exchange(uriTipoTurnoFac, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<TipoTurnoFac>>() {
                }, uriParams);

        ArrayList<TipoTurno> tiposTurno = new ArrayList<>();

        System.out.println(result.getBody().getData().getRows());

        result.getBody().getData().getRows().forEach(tipoTurnoHigea -> tiposTurno.add(tipoTurnoHigea.convert()));

        return tiposTurno;
    }


}
