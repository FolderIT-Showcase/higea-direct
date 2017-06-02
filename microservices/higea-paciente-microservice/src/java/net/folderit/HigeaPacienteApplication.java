package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Persona;
import net.folderit.dto.PacienteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@RestController
public class HigeaPacienteApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaPacienteApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaPacienteApplication.class, args);
    }


    @PostMapping("/{cliente}")
    public ResponseEntity<PacienteDTO> save(@PathVariable("cliente") String codigo, @RequestBody Persona persona) {
        return connectionMidleWare.savePaciente(codigo, persona);
    }

}
