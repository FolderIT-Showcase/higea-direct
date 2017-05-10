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

    private PersonaService  personaService;

    @Autowired
    public TurnoController(TurnoService turnoService,PersonaService  personaService) {
        this.turnoService = turnoService;
        this.personaService = personaService;
    }

    @PostMapping("/turno")
    public ResponseEntity<Collection<Turno>> getAll(@RequestBody FilterDto filterDto) {
        List<Turno> turnos = turnoService.finAllBy(filterDto);
        return new ResponseEntity<>((List<Turno>) turnos, HttpStatus.OK);
    }

    @GetMapping("/turno")
    public ResponseEntity<Collection<Turno>> getAll() {
        Iterable<Turno> turnos = turnoService.findAll();
        return new ResponseEntity<>((List<Turno>) turnos, HttpStatus.OK);
    }

    @PutMapping("/turno")
    public ResponseEntity<Turno> saveTurno(@RequestBody Turno turno) {
        Turno result = turnoService.saveTurno(turno);
        return new ResponseEntity<>((Turno) result, HttpStatus.OK);
    }

    @DeleteMapping("/turno")
    public ResponseEntity<Persona> deleteTurno(@RequestParam Long id,@RequestParam Boolean desactivate) {
        Persona persona = personaService.findByTurno(id);
        //persona.getTurno().remove(persona.getTurno().)
        Persona result = null;
        Turno turnoDelete = null;
        if (persona != null) {

            int index = -1;
            for (Turno turno : persona.getTurno()) {
                index++;
                if (turno.getId().equals(id)) {
                    turnoDelete = turno;
                    break;
                }

            }

            if (turnoDelete != null) {
                persona.getTurno().remove(index);
                result = personaService.save(persona);
                personaService.mandarMailDeBaja(persona);
            }

        }
        if(desactivate){
           if(turnoDelete==null){turnoDelete = turnoService.findById(id);}
            turnoDelete.setEnabled(Boolean.FALSE);
            this.turnoService.saveTurno(turnoDelete);
        }else{
            if(turnoDelete==null){turnoDelete = turnoService.findById(id);}
            turnoDelete.setTomado(Boolean.FALSE);
            this.turnoService.saveTurno(turnoDelete);
        }

        return new ResponseEntity<>((Persona) result, HttpStatus.OK);
    }


}
