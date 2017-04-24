package net.folderit.web;

import net.folderit.domain.Localidad;
import net.folderit.domain.Pais;
import net.folderit.domain.Persona;
import net.folderit.domain.Provincia;
import net.folderit.service.MetadataService;
import net.folderit.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Created by gheng on 19/4/2017.
 */
@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class MetadataController {

    @Autowired
    private MetadataService metadataService;

    @GetMapping("/pais")
    public ResponseEntity<Collection<Pais>> getAllPais() {
        return new ResponseEntity<>((Collection<Pais>) metadataService.findAllPaisOrderByNombreAsc(), HttpStatus.OK);
    }

    @GetMapping("/provincia")
    public ResponseEntity<Collection<Provincia>> getAllProvincia() {
        return new ResponseEntity<>((Collection<Provincia>) metadataService.findAllProvincia(), HttpStatus.OK);
    }

    @GetMapping("/localidad")
    public ResponseEntity<Collection<Localidad>> getAllLocalidad() {
        return new ResponseEntity<>((Collection<Localidad>) metadataService.findAllLocalidad(), HttpStatus.OK);
    }

}
