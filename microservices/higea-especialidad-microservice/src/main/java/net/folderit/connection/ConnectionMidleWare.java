package net.folderit.connection;

import net.folderit.converters.DataDTO;
import net.folderit.converters.EspecialidadCoreDTO;
import net.folderit.dto.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ConnectionMidleWare {


    final String uriLogin = "http://higea.folderit.net/api/login";
    final String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/especialidades";
    final String uriProfesionales = "http://localhost:36001/{cliente}/profesionales";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<LoginResultDTO> login() {


        LoginDTO loginDTO = new LoginDTO("turneroweb", "WroteScientistFarmerCarbon");

        // send request and parse result

        LoginResultDTO result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultDTO.class);

        return ResponseEntity.ok(result);

    }

    public List<RowProfesionalDTO> getProfesionales(String codigo, HttpEntity<?> entity) {


        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);

        // send request and parse result
       ResponseEntity<ProfesionalDataDTO> result = restTemplate.exchange(uriProfesionales, HttpMethod.GET, entity, ProfesionalDataDTO.class, uriParams);


        return result.getBody().getRows();

    }


    public List<EspecialidadCoreDTO> especialidades(String codigo) {

        ResponseEntity<LoginResultDTO> loginResultDTO = login();




        // URI (URL) parameters
        Map<String, String> uriParams = new HashMap<>();
        uriParams.put("cliente", codigo);


        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", loginResultDTO.getBody().getToken());
        HttpEntity<?> entity = new HttpEntity<>(headers);

         List<RowProfesionalDTO> prefesionalRowDTO = this.getProfesionales(codigo,entity);


        ResponseEntity<EspecialidadDTO> result = restTemplate.exchange(uriEspecialidad, HttpMethod.GET, entity, EspecialidadDTO.class, uriParams);

        List<EspecialidadCoreDTO> especialidadCoreDTOS = new ArrayList<>();

        for (Iterator<EspecialidadesRow> i = result.getBody().getData().getRows().iterator(); i.hasNext();) {
            EspecialidadesRow item = i.next();
            EspecialidadCoreDTO especilidadCoreDTO = item.convertToEspecialidadCoreDTO();

            for (Iterator<RowProfesionalDTO> j = prefesionalRowDTO.iterator(); j.hasNext();) {
                RowProfesionalDTO profesionalRowDTO = j.next();
                if(especilidadCoreDTO.getId().intValue()==profesionalRowDTO.getEspecialidad_id()){
                    if(especilidadCoreDTO.getProfesional()==null){especilidadCoreDTO.setProfesional(new ArrayList<>());}
                    especilidadCoreDTO.getProfesional().add(profesionalRowDTO.converterToProfesionalCore());
                }
            }

            especialidadCoreDTOS.add(especilidadCoreDTO);


        }
        //DataDTO dataDTO = new DataDTO(especialidadCoreDTOS);
        return especialidadCoreDTOS;//especialidades core
    }
}
