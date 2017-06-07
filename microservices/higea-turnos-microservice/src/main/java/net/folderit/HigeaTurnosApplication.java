package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Turno;
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

    @PostMapping("/{cliente}")
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


    @PostMapping("/{cliente}/persona/{personaId}")
    public ResponseEntity<?> saveTurno(@PathVariable("cliente") String codigo,
                                       @PathVariable("personaId") Integer personaId,
                                       @RequestBody Turno turno) {
        return ResponseEntity.ok(connectionMidleWare.save(codigo, turno, personaId));
    }

    @GetMapping("/{cliente}/persona/{personaId}")
    public ResponseEntity<List<Turno>> getTurnosByPersona(@PathVariable("personaId") Integer personaId) {
        return ResponseEntity.ok(connectionMidleWare.findAllByPersona(personaId));
    }

    @GetMapping("/{cliente}/agendas")
    public ResponseEntity<?> getTurnosLibres(@RequestParam("profesional_id") Integer profesionalId,
                                             @RequestParam(name = "servicio_id", required = false) Integer servicioId,
                                             @RequestParam(name = "plan_os_id", required = false) Integer planId,
                                             @RequestParam("agenda_fecha") String fecha) {
        return ResponseEntity.ok(connectionMidleWare.findTurnosLibres(profesionalId, servicioId, planId, fecha));
    }

}
