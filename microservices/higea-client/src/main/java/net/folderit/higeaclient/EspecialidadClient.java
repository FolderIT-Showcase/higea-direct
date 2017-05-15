package net.folderit.higeaclient;

import feign.Headers;
import net.folderit.higeaclient.dto.ProfesionalDataDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by luis on 15/05/17.
 */
@FeignClient("HIGEA-ESPECIALIDAD-MICROSERVICE")
public interface EspecialidadClient {

    @Headers("Content-Type: application/json")
    @RequestMapping(value = "/{cliente}/especialidades", consumes = "application/json", produces = "application/json")
    ProfesionalDataDTO getProfesionales(@PathVariable("cliente") String cliente);
}
