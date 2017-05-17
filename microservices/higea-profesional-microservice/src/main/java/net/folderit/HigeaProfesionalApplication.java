package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.dto.ProfesionalDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class HigeaProfesionalApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaProfesionalApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaProfesionalApplication.class, args);
    }

    @RequestMapping("/{cliente}")
    public ProfesionalDataDTO especialidades(@PathVariable("cliente") String codigo) {
        return connectionMidleWare.profesionales(codigo);
    }

}
