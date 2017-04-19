package net.folderit.web;

import net.folderit.domain.Persona;
import net.folderit.dto.ResultAfipDto;
import net.folderit.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by gheng on 18/4/2017.
 */
@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class PersonaController {

    private PersonaService personaService;

    @Autowired
    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
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
        Persona mPersona = personaService.save(persona);
        return ResponseEntity.ok(mPersona.getId());
    }

    @GetMapping("/persona/afip")
    public ResponseEntity validPersona(@RequestParam(name = "documento") String documento,
                                       @RequestParam(name = "nombre") String nombre,
                                       @RequestParam(name = "apellido") String apellido,
                                       @RequestParam(name = "sexo") String sexo) {


        ResultAfipDto dto = null;
        try {
            dto = personaService.isDocumentValid(documento, nombre, apellido, sexo);
        } catch (Exception e) {
            throw new IllegalArgumentException("Sexo o DNI no valido. La longitud no corresponde");
        }
        if (dto.getData() != null) return ResponseEntity.ok(dto);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }
}
