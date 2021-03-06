package net.folderit.web;

import net.folderit.domain.core.*;
import net.folderit.service.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/metadata")
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class MetadataController {

    private final MetadataService metadataService;

    @Autowired
    public MetadataController(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @GetMapping("pais")
    public ResponseEntity<Collection<Pais>> getAllPais() {
        return new ResponseEntity<>((Collection<Pais>) metadataService.findAllPais(), HttpStatus.OK);
    }

    @GetMapping("provincia")
    public ResponseEntity<Collection<Provincia>> getAllProvincia() {
        return new ResponseEntity<>((Collection<Provincia>) metadataService.findAllProvincia(), HttpStatus.OK);
    }

    @GetMapping("localidad")
    public ResponseEntity<Collection<Localidad>> getAllLocalidad() {
        return new ResponseEntity<>((Collection<Localidad>) metadataService.findAllLocalidad(), HttpStatus.OK);
    }

    @GetMapping("centroSalud")
    public ResponseEntity<Collection<CentroSalud>> getAllCentroSalud() {
        return new ResponseEntity<>((Collection<CentroSalud>) metadataService.findAllCentroSalud(), HttpStatus.OK);
    }

    @GetMapping("especialidad")
    public ResponseEntity<Collection<Especialidad>> getAllEspecialidad() {
        return new ResponseEntity<>((Collection<Especialidad>) metadataService.findAllEspecialidad(), HttpStatus.OK);
    }

    @GetMapping("profesional")
    public ResponseEntity<Collection<Profesional>> getAllProfesional() {
        return new ResponseEntity<>((Collection<Profesional>) metadataService.findAllProfesional(), HttpStatus.OK);
    }

    @PostMapping("especialidad")
    public ResponseEntity<Especialidad> guardarEspecialidad(@RequestBody Especialidad especialidad) {
        return new ResponseEntity<>((Especialidad) metadataService.saveEspecialidad(especialidad), HttpStatus.OK);
    }

    @PutMapping("especialidad")
    public ResponseEntity<Especialidad> actualizarEspecialidad(@RequestBody Especialidad especialidad) {
        return new ResponseEntity<>((Especialidad) metadataService.saveEspecialidad(especialidad), HttpStatus.OK);
    }


    @PostMapping("centroSalud")
    public ResponseEntity<CentroSalud> guardarCentroSalud(@RequestBody CentroSalud centroSalud) {
        return new ResponseEntity<>((CentroSalud) metadataService.saveCentroSalud(centroSalud), HttpStatus.OK);
    }

    @PutMapping("centroSalud")
    public ResponseEntity<CentroSalud> actualizarCentroSalud(@RequestBody CentroSalud centroSalud) {
        return new ResponseEntity<>((CentroSalud) metadataService.saveCentroSalud(centroSalud), HttpStatus.OK);
    }

    @PostMapping("profesional")
    public ResponseEntity<Profesional> guardarProfesional(@RequestBody Profesional profesional) {
        return new ResponseEntity<>((Profesional) metadataService.saveProfesional(profesional), HttpStatus.OK);
    }

    @PutMapping("profesional")
    public ResponseEntity<Profesional> actualizarProfesional(@RequestBody Profesional profesional) {
        return new ResponseEntity<>((Profesional) metadataService.saveProfesional(profesional), HttpStatus.OK);
    }

    @DeleteMapping("profesional")
    public ResponseEntity deleteProfesional(@RequestParam String id) {
        try {
            metadataService.deleteProfesional(Long.valueOf(id));
        } catch (DataIntegrityViolationException exception) {
            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_ESPECIALIDAD_ASOCIADA, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("centroSalud")
    public ResponseEntity deleteCentroSalud(@RequestParam String id) {
        try {
            metadataService.deleteCentroSalud(Long.valueOf(id));
        } catch (DataIntegrityViolationException exception) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_PROFESIONALES_ASOCIADA, null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());

        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("especialidad")
    public ResponseEntity deleteEspecialidad(@RequestParam String id) {
        try {
            metadataService.deleteEspecialidad(Long.valueOf(id));
        } catch (DataIntegrityViolationException exception) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_PROFESIONALES_ASOCIADA, null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());

        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("obraSocial")
    public ResponseEntity<Collection<ObraSocial>> getAllObrasSociales() {
        return new ResponseEntity<>((Collection<ObraSocial>) metadataService.getAllObrasSociales(), HttpStatus.OK);
    }

    @GetMapping("tipoTurno")
    public ResponseEntity<Collection<TipoTurno>> getAllTiposTurnos() {
        return new ResponseEntity<>((Collection<TipoTurno>) metadataService.getAllTiposTurnos(), HttpStatus.OK);
    }

    @GetMapping("motivoTurno")
    public ResponseEntity<Collection<MotivoTurno>> getAllMotivosTurno() {
        return ResponseEntity.ok(metadataService.getAllmotivosTurno());
    }

    @GetMapping("motivoTurno/{id}")
    public ResponseEntity<MotivoTurno> getMotivosTurnoById(@PathVariable("id") Integer personaId) {
        return ResponseEntity.ok(metadataService.getMotivoTurnoById(personaId));
    }
}
