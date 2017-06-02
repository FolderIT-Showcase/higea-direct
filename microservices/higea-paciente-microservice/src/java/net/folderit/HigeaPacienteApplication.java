package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Persona;
import net.folderit.domain.higea.PacienteHigea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableEurekaClient
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
    public ResponseEntity<PacienteHigea> save(@PathVariable("cliente") String codigo, @RequestBody Persona persona) {
        return ResponseEntity.ok(connectionMidleWare.savePaciente(codigo, persona));
    }

}
