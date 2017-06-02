package net.folderit.service;

import net.folderit.domain.ObraSocial;
import net.folderit.dto.LoginDTO;
import net.folderit.dto.LoginResultDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SyncService {

    private final MetadataService metadataService;

    private RestTemplate restTemplate = new RestTemplate();

    @Autowired
    public SyncService(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    private ResponseEntity<LoginResultDTO> login() {
        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String url = "http://higea.folderit.net/api/login";
        LoginResultDTO result = restTemplate.postForObject(url, loginDTO, LoginResultDTO.class);
        return ResponseEntity.ok(result);
    }

    // @Scheduled(fixedRate = 35000)
    public String SyncObrasSociales() {

        String codigo = "BONFANTI";

        ResponseEntity<LoginResultDTO> loginResultDTO = login();
        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

        String url = "http://localhost:36004/{cliente}/obrasSociales";
        ResponseEntity<List<ObraSocial>> result = restTemplate.exchange(url, HttpMethod.GET, entity,
                new ParameterizedTypeReference<List<ObraSocial>>() {
                }, uriParams);

        System.out.println(result);

        List<ObraSocial> obrasSociales = this.metadataService.getAllObrasSociales();
        List<ObraSocial> obrasSocialesHigea = result.getBody();

        if (obrasSociales.isEmpty()) {

            obrasSocialesHigea.forEach(o -> {
                System.out.println(o);
                // metadataService.saveObraSocial(obrasSocialesHigea.get(i));
            });

        } else {

            if (obrasSociales.get(obrasSociales.size() - 1).getId() >= obrasSocialesHigea.get(obrasSocialesHigea.size() - 1).getId()) {
                return "";
            }

            for (int i = obrasSociales.size() + 1; i > obrasSocialesHigea.size(); i++) {
                System.out.println(obrasSocialesHigea.get(i));
                // metadataService.saveObraSocial(obrasSocialesHigea.get(i));
            }
        }

        return "";

    }

}
