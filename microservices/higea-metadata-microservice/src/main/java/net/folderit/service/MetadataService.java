package net.folderit.service;

import net.folderit.domain.core.*;
import net.folderit.domain.core.enums.EstadoCivil;
import net.folderit.domain.higea.*;
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

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String url = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(url, loginDTO, LoginResultHigea.class);
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

        ResponseEntity<LoginResultHigea> loginResultDTO = login();
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

        result.getBody().getData().getRows().forEach(obraSocialHigea -> {

            List<PlanObraSocialHigea> planesHigea = todosLosPlanes.stream().filter(plan ->
                    plan.getObra_social_id() == obraSocialHigea.getObra_social_id()).collect(Collectors.toList());

            List<Plan> planes = new ArrayList<>();

            planesHigea.forEach(p -> planes.add(p.convert()));

            ObraSocial obraSocialCore = obraSocialHigea.convert();
            obraSocialCore.setPlanes(planes);
            obrasSociales.add(obraSocialCore);
        });

        return obrasSociales;
    }

    public List<TipoTurno> findTiposTurnoFac(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/tipoTurnoFac";
        ResponseEntity<Result<TipoTurnoHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<TipoTurnoHigea>>() {
                }, uriParams);

        ArrayList<TipoTurno> tiposTurno = new ArrayList<>();

        result.getBody().getData().getRows().forEach(tipoTurnoHigea -> tiposTurno.add(tipoTurnoHigea.convert()));

        return tiposTurno;
    }

    public List<MotivoTurno> findMotivosTurno(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/motivoTurnos";
        ResponseEntity<Result<MotivoTurnoHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<MotivoTurnoHigea>>() {
                }, uriParams);

        ArrayList<MotivoTurno> motivosTurno = new ArrayList<>();

        result.getBody().getData().getRows().forEach(motivoTurnoHigea -> motivosTurno.add(motivoTurnoHigea.convert()));

        return motivosTurno;
    }



    public List<Pais> findPaises(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/paises";
        ResponseEntity<Result<PaisHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<PaisHigea>>() {
                }, uriParams);

        List<Pais> paises = new ArrayList<>();

        result.getBody().getData().getRows().forEach(paisHigea -> {
            paises.add(paisHigea.convert());
        });

        return paises;

    }

    public List<Provincia> findProvincias(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/provincias";
        ResponseEntity<Result<ProvinciaHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<ProvinciaHigea>>() {
                }, uriParams);

        List<Provincia> provincias = new ArrayList<>();

        result.getBody().getData().getRows().forEach(provinciaHigea -> {
            provincias.add(provinciaHigea.convert());
        });

        return provincias;
    }

    public List<Localidad> findLocalidades(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/localidades";
        ResponseEntity<Result<LocalidadHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<LocalidadHigea>>() {
                }, uriParams);

        List<Localidad> localidades = new ArrayList<>();

        result.getBody().getData().getRows().forEach(localidadHigea -> {
            localidades.add(localidadHigea.convert());
        });

        return localidades;
    }

    public List<EstadoCivil> findEstadoCiviles(String codigo) {
        ResponseEntity<LoginResultHigea> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://higea.folderit.net/api/{cliente}/estadoCiviles";
        ResponseEntity<Result<EstadoCivilHigea>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<Result<EstadoCivilHigea>>() {}, uriParams);

        List<EstadoCivil> estadosCiviles = new ArrayList<>();

        result.getBody().getData().getRows().forEach(estadoCivilHigea -> {
            estadosCiviles.add(estadoCivilHigea.convert());
        });

        return estadosCiviles;
    }

}
