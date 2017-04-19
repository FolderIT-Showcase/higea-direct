package net.folderit.web;

import net.folderit.domain.Persona;
import net.folderit.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

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

    @PostMapping("/persona")
    public ResponseEntity<Long> createUser(@RequestBody Persona persona) {
        Persona mPersona = personaService.save(persona);
        return ResponseEntity.ok(mPersona.getId());
    }

    @RequestMapping({"/persona", "/me"})
    public Map<String, String> persona(Principal principal) {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", principal.getName());
        return map;
    }
}
