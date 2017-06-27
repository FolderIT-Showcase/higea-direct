package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Persona;
import net.folderit.domain.core.TurneroException;
import net.folderit.domain.higea.PacienteHigea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> save(@PathVariable("cliente") String codigo, @RequestBody Persona persona) {
        PacienteHigea pacienteHigea = connectionMidleWare.getByDocAndGenero(codigo, persona.getSexo(), persona.getDocumento().getNumero().toString());

        if (pacienteHigea != null) {
            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_DOC_EXIST, new String[]{persona.getDocumento().getNumero().toString()});
            return ResponseEntity.status(HttpStatus.CONFLICT).body(TurneroException.getInstance());
        }

        return ResponseEntity.ok(connectionMidleWare.savePaciente(codigo, persona));
    }

    @GetMapping("/{cliente}")
    public PacienteHigea getByDocAndGenero(@PathVariable("cliente") String codigo, @RequestParam("genero") String genero,
                                           @RequestParam("documento") String documento) {
        return connectionMidleWare.getByDocAndGenero(codigo, genero, documento);
    }
}
