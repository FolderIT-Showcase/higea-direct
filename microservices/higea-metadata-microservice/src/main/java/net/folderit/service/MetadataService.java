package net.folderit.service;

import net.folderit.domain.*;
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

    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String url = "http://higea.folderit.net/api/login";
        LoginResultDTO result = restTemplate.postForObject(url, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);
    }

    private ArrayList<PlanObraSocialHigea> findAllPlanesObrasSociales(HttpEntity<?> entity, Map<String, String> uriParams) {
        String url = "http://higea.folderit.net/api/{cliente}/planesObraSocial";
        ResponseEntity<Result<PlanObraSocialHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<PlanObraSocialHigea>>() {
                }, uriParams);

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

        String url = "http://higea.folderit.net/api/{cliente}/obrasSociales";
        ResponseEntity<Result<ObraSocialHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<ObraSocialHigea>>() {
                }, uriParams);

        ArrayList<ObraSocial> obrasSociales = new ArrayList<>();

        result.getBody().getData().getRows().forEach(obraSocial -> {

            List<PlanObraSocialHigea> planesHigea = todosLosPlanes.stream().filter(plan ->
                    plan.getObra_social_id() == obraSocial.getObra_social_id()).collect(Collectors.toList());

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

        String url = "http://higea.folderit.net/api/paises";
        ResponseEntity<Result<TipoTurnoFac>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<TipoTurnoFac>>() {
                }, uriParams);

        ArrayList<TipoTurno> tiposTurno = new ArrayList<>();

        result.getBody().getData().getRows().forEach(tipoTurnoHigea -> tiposTurno.add(tipoTurnoHigea.convert()));

        return tiposTurno;
    }

    public List<Pais> findPaises(String codigo) {
        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/provincias";
        ResponseEntity<Result<Pais>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<Pais>>() {
                }, uriParams);

        return new ArrayList<>(result.getBody().getData().getRows());

    }

    public List<Provincia> findProvincias(String codigo) {
        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/localidades";
        ResponseEntity<Result<Provincia>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<Provincia>>() {
                }, uriParams);

        return new ArrayList<>(result.getBody().getData().getRows());
    }

    public List<Localidad> findLocalidades(String codigo) {
        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/tipoTurnoFac";
        ResponseEntity<Result<Localidad>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<Localidad>>() {
                }, uriParams);

        return new ArrayList<>(result.getBody().getData().getRows());
    }


}
