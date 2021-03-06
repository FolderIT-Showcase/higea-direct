package net.folderit.web;


import net.folderit.domain.core.Persona;
import net.folderit.domain.core.TurneroException;
import net.folderit.dto.ResultAfipDto;
import net.folderit.service.PersonaService;
import net.folderit.service.TurnoService;
import net.folderit.util.JasperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class PersonaController {

    private final PersonaService personaService;
    private final TurnoService turnoService;

    @Autowired
    public PersonaController(PersonaService personaService, TurnoService turnoService) {
        this.personaService = personaService;
        this.turnoService = turnoService;
    }

    @GetMapping("/persona")
    public ResponseEntity<Collection<Persona>> getAll() {
        return new ResponseEntity<>((Collection<Persona>) personaService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/persona/{id}")
    public ResponseEntity<Collection<Persona>> getById(@PathVariable Long id) {
        return new ResponseEntity<>((Collection<Persona>) personaService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/persona")
    public ResponseEntity<Long> createUser(@RequestBody Persona persona) {
        Persona exist =  personaService.findById(persona.getId());
        if(exist!=null) persona.getUserAsociado().setPassword(exist.getUserAsociado().getPassword());
        Persona mPersona = personaService.save(persona);
        return ResponseEntity.ok(mPersona.getId());
    }


    @PostMapping(value = "/persona/pdf")
    public ResponseEntity getPDf(@RequestBody Persona persona) throws Exception {

        JasperUtil jasperUtil = new JasperUtil();

        return ResponseEntity.ok(jasperUtil.buildReportTurno(persona.getTurno()));

    }


    @DeleteMapping("/persona")
    public ResponseEntity<Long> deleteLogical(@RequestBody Persona persona) {
        persona.setEnabled(Boolean.FALSE);
        Persona mPersona = personaService.save(persona);
        return ResponseEntity.ok(mPersona.getId());
    }

    @GetMapping("/persona/email")
    public ResponseEntity findByUserAsociadoEmail(@RequestParam String email) {
        return new ResponseEntity<>((Persona) personaService.findByUserAsociadoEmail(email), HttpStatus.OK);
    }

    @GetMapping("/persona/afip")
    public ResponseEntity validPersona(@RequestParam(name = "documento") String documento,
                                       @RequestParam(name = "nombre") String nombre,
                                       @RequestParam(name = "apellido") String apellido,
                                       @RequestParam(name = "genero") String genero) {


        ResultAfipDto dto = null;
        try {
            dto = personaService.isDocumentValid(documento, nombre, apellido, genero);
        } catch (Exception e) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_AFIP_INVALID, null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());

        }
        if (dto.getData() != null) return ResponseEntity.ok(dto);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }
}
