package net.folderit.web;

import net.folderit.domain.Persona;
import net.folderit.domain.Turno;
import net.folderit.dto.FilterDto;
import net.folderit.service.PersonaService;
import net.folderit.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class TurnoController {

    private TurnoService turnoService;

    @Autowired
    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @PostMapping("/turno")
    public ResponseEntity<Collection<Turno>> getAll(@RequestBody FilterDto filterDto) {
        List<Turno> turnos = turnoService.finAllBy(filterDto);
        return new ResponseEntity<>((List<Turno>) turnos, HttpStatus.OK);
    }
}