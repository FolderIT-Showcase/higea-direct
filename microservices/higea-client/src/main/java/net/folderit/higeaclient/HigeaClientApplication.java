package net.folderit.higeaclient;

import net.folderit.higeaclient.dto.ProfesionalDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@RestController
public class HigeaClientApplication {

    private final ProfesionalesClient profesionalesClient;

    @Autowired
    public HigeaClientApplication(ProfesionalesClient profesionalesClient) {
        this.profesionalesClient = profesionalesClient;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaClientApplication.class, args);
    }

    @RequestMapping("/get-profesionales")
    public ProfesionalDataDTO greeting(@RequestParam String codigo) {
        return profesionalesClient.getProfesionales(codigo);
    }
}
