package net.folderit.web;

import net.folderit.domain.*;
import net.folderit.service.MetadataService;
import net.folderit.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return new ResponseEntity<>((Collection<Pais>) metadataService.findAllPais(), HttpStatus.OK);
    }

    @GetMapping("/provincia")
    public ResponseEntity<Collection<Provincia>> getAllProvincia() {
        return new ResponseEntity<>((Collection<Provincia>) metadataService.findAllProvincia(), HttpStatus.OK);
    }

    @GetMapping("/localidad")
    public ResponseEntity<Collection<Localidad>> getAllLocalidad() {
        return new ResponseEntity<>((Collection<Localidad>) metadataService.findAllLocalidad(), HttpStatus.OK);
    }

    @GetMapping("/centroSalud")
    public ResponseEntity<Collection<CentroSalud>> getAllCentroSalud() {
        return new ResponseEntity<>((Collection<CentroSalud>) metadataService.findAllCentroSalud(), HttpStatus.OK);
    }

    @GetMapping("/especialidad")
    public ResponseEntity<Collection<Especialidad>> getAllEspecialidad() {
        return new ResponseEntity<>((Collection<Especialidad>) metadataService.findAllEspecialidad(), HttpStatus.OK);
    }

    @GetMapping("/profesional")
    public ResponseEntity<Collection<Profesional>> getAllProfesional() {
        return new ResponseEntity<>((Collection<Profesional>) metadataService.findAllProfesional(), HttpStatus.OK);
    }

    @PutMapping("/especialidad")
    public ResponseEntity<Especialidad> guardarEspecialidad(@RequestBody Especialidad especialidad) {
        return new ResponseEntity<>((Especialidad) metadataService.saveEspecialidad(especialidad), HttpStatus.OK);
    }


    @PutMapping("/centroSalud")
    public ResponseEntity<CentroSalud> guardarCentroSalud(@RequestBody CentroSalud centroSalud) {
        return new ResponseEntity<>((CentroSalud) metadataService.saveCentroSalud(centroSalud), HttpStatus.OK);
    }

    @PutMapping("/profesional")
    public ResponseEntity<Profesional> guardarProfesional(@RequestBody Profesional profesional) {
        return new ResponseEntity<>((Profesional) metadataService.saveProfesional(profesional), HttpStatus.OK);
    }
}
