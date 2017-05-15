package net.folderit;

import feign.Body;
import feign.Headers;
import net.folderit.dto.ProfesionalDTO;
import net.folderit.dto.ProfesionalDataDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by luis on 15/05/17.
 */
@FeignClient("HIGEA-PROFESIONAL-MICROSERVICE")
public interface ProfesionalesClient {

    @Headers("Content-Type: application/json")
    @RequestMapping(value = "/{cliente}/profesionales",consumes = "application/json",produces = "application/json")
    ProfesionalDataDTO getProfesionales(@PathVariable("cliente") String cliente);
}
