package net.folderit;

import net.folderit.dto.ProfesionalDTO;
import net.folderit.dto.ProfesionalDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by luis on 15/05/17.
 */
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@Controller
public class FeignClientApplication {

    @Autowired
    private ProfesionalesClient profesionalesClient;


    public static void main(String[] args) {
        SpringApplication.run(FeignClientApplication.class, args);
    }

    @RequestMapping("/get-profesionales")
    public String greeting(@RequestParam String codigo) {
        ProfesionalDataDTO profesionales = profesionalesClient.getProfesionales(codigo);
        return profesionales.toString();
    }
}
