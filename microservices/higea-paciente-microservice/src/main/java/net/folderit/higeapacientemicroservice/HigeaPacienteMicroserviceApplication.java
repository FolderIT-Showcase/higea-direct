package net.folderit.higeapacientemicroservice;

import net.folderit.domain.core.Persona;
import net.folderit.higeapacientemicroservice.connection.ConnectionMidleWare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@SpringBootApplication
@EnableEurekaClient
public class HigeaPacienteMicroserviceApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaPacienteMicroserviceApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaPacienteMicroserviceApplication.class, args);
    }

    @PostMapping("/{cliente}")
    public ResponseEntity<Persona> save(@PathVariable("cliente") String codigo, @RequestBody Persona persona) {
        return ResponseEntity.ok(connectionMidleWare.savePaciente(codigo, persona));
    }
}
