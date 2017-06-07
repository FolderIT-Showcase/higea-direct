package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Turno;
import net.folderit.domain.higea.TurnoHigea;
import net.folderit.dto.FilterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class HigeaTurnosApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaTurnosApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaTurnosApplication.class, args);
    }

    @GetMapping("/{cliente}")
    public ResponseEntity<Collection<Turno>> getAll(@PathVariable("cliente") String codigo, @RequestBody FilterDto filterDto) {
        List<Turno> turnos = connectionMidleWare.findAllBy(codigo, filterDto);
        return ResponseEntity.ok(turnos);
    }

    @GetMapping("/{cliente}/{personaId}")
    public ResponseEntity<Collection<Turno>> getAllByPersona(
            @PathVariable("cliente") String codigo,
            @PathVariable("personaId") Integer personaId) {
        List<Turno> turnos = connectionMidleWare.findAllByPersona(personaId);
        return ResponseEntity.ok(turnos);
    }

    @PostMapping("/{cliente}")
    public ResponseEntity<?> save(@PathVariable("cliente") String codigo, @RequestBody TurnoHigea turnoDTO) {
        // TurnoDTO turno = connectionMidleWare.save(codigo, turnoDTO, -1);
        return ResponseEntity.ok("Deprecated endpoint");
    }

    @PostMapping("/{cliente}/persona/{personaId}/turno")
    public ResponseEntity<?> saveTurno(@PathVariable("cliente") String codigo,
                                       @PathVariable("personaId") Integer personaId,
                                       @RequestBody Turno turno) {
        return ResponseEntity.ok(connectionMidleWare.save(codigo, turno, personaId));
    }

    @GetMapping("/{cliente}/persona/{personaId}/turno")
    public ResponseEntity<?> getTurnos(@PathVariable("personaId") Integer personaId) {
        return ResponseEntity.ok(connectionMidleWare.findAllByPersona(personaId));
    }

}
