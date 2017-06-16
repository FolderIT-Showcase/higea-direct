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

    @GetMapping("/{cliente}/{personaId}")
    public ResponseEntity<Collection<Turno>> getAllByPersona(
            @PathVariable("cliente") String codigo,
            @PathVariable("personaId") Integer personaId) {
        List<Turno> turnos = connectionMidleWare.findAllByPersona(personaId);
        return ResponseEntity.ok(turnos);
    }

    @PostMapping("/{cliente}/persona/{personaId}")
    public ResponseEntity<?> otorgarTurno(@PathVariable("cliente") String codigo,
                                       @PathVariable("personaId") Integer personaId,
                                       @RequestBody Turno turno) {
        return ResponseEntity.ok(connectionMidleWare.otorgarTurno(codigo, turno, personaId));
    }

    @GetMapping("/{cliente}/persona/{personaId}")
    public ResponseEntity<List<Turno>> getTurnosByPersona(@PathVariable("personaId") Integer personaId) {
        return ResponseEntity.ok(connectionMidleWare.findAllByPersona(personaId));
    }

    @PostMapping("/{cliente}")
    public ResponseEntity<?> getTurnosLibres(@RequestBody FilterDto filterDto) {
        return ResponseEntity.ok(connectionMidleWare.findTurnosLibres(filterDto));
    }

    @GetMapping("/{cliente}/estadosTurnos")
    public ResponseEntity<?> getEstadosTurnos(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(connectionMidleWare.findEstadosTurnos(codigo));
    }

    @GetMapping("/{cliente}/calendarios")
    public ResponseEntity<?> getCalendarios(@PathVariable("cliente") String codigo, @RequestParam("profesional_id") String profesional_id,
                                            @RequestParam("servicio_id") String servicio_id, @RequestParam("calendario_fecha") String calendario_fecha) {
        return ResponseEntity.ok(connectionMidleWare.findCalendarios(codigo,profesional_id,servicio_id,calendario_fecha));
    }

}
