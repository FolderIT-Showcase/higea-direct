package net.folderit.higeaclient;

import feign.Headers;
import net.folderit.higeaclient.dto.ProfesionalDataDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("HIGEA-PROFESIONAL-MICROSERVICE")
public interface ProfesionalesClient {
    @Headers("Content-Type: application/json")
    @RequestMapping(value = "/{cliente}/profesionales", consumes = "application/json", produces = "application/json")
    ProfesionalDataDTO getProfesionales(@PathVariable("cliente") String cliente);
}
