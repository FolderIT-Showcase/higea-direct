package net.folderit.web;

import net.folderit.domain.Persona;
import net.folderit.domain.Turno;
import net.folderit.domain.exception.TurneroException;
import net.folderit.dto.FilterDto;
import net.folderit.service.PersonaService;
import net.folderit.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class TurnoController {

    private TurnoService turnoService;

    private PersonaService personaService;

    @Autowired
    public TurnoController(TurnoService turnoService, PersonaService personaService) {
        this.turnoService = turnoService;
        this.personaService = personaService;
    }

    @PostMapping("/turnos")
    public ResponseEntity getAll(@RequestBody FilterDto filterDto) {

        String target = filterDto.getFecha();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date result = null;
        try {
            result = df.parse(target);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if ((result != null ? result.compareTo(new Date()) : 0) <= 0) {
            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_INVALID_TOKEN, null);
            return new ResponseEntity<>(TurneroException.getInstance(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        List<Turno> turnos = turnoService.findAllBy(filterDto);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
    }

    @PostMapping("/turnos")
    public ResponseEntity getNextAvailable(@RequestBody FilterDto filterDto) {
        List<Turno> turnos = turnoService.findNextAvailable(filterDto);
        return new ResponseEntity<>(turnos, HttpStatus.OK);
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
    public ResponseEntity<Persona> deleteTurno(@RequestParam Long id, @RequestParam Boolean desactivate) {
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
        if (desactivate) {
            if (turnoDelete == null) {
                turnoDelete = turnoService.findById(id);
            }
            turnoDelete.setEnabled(Boolean.FALSE);
            this.turnoService.saveTurno(turnoDelete);
        } else {
            if (turnoDelete == null) {
                turnoDelete = turnoService.findById(id);
            }
            turnoDelete.setTomado(Boolean.FALSE);
            this.turnoService.saveTurno(turnoDelete);
        }

        return new ResponseEntity<>((Persona) result, HttpStatus.OK);
    }


}
