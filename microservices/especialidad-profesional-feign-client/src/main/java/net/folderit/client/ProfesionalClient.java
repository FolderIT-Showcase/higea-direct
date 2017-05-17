package net.folderit.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by luis on 17/05/17.
 */
@FeignClient("higea-profesional-microservice")
public interface ProfesionalClient {

    @RequestMapping("/{cliente}/profesionales")
    String profesionales();
}
