package net.folderit;

import net.folderit.domain.core.*;
import net.folderit.domain.core.enums.EstadoCivil;
import net.folderit.service.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@RestController
public class HigeaMetadataApplication {

    private final MetadataService metadataService;

    @Autowired
    public HigeaMetadataApplication(MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaMetadataApplication.class, args);
    }

    @GetMapping("/{cliente}/obraSocial")
    public ResponseEntity<List<ObraSocial>> getObrasSociales(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findAllObrasSociales());
    }

    @GetMapping("/{cliente}/tipoTurno")
    public ResponseEntity<List<TipoTurno>> getTiposTurnoFac(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findTiposTurnoFac());
    }

    @GetMapping("/{cliente}/motivoTurno")
    public ResponseEntity<List<MotivoTurno>> getMotivosTurno(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findMotivosTurno());
    }

    @GetMapping("/{cliente}/pais")
    public ResponseEntity<List<Pais>> getPaises(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findPaises());
    }

    @GetMapping("/{cliente}/provincia")
    public ResponseEntity<List<Provincia>> getProvincias(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findProvincias());
    }

    @GetMapping("/{cliente}/localidad")
    public ResponseEntity<List<Localidad>> getLocalidades(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findLocalidades());
    }

    @GetMapping("/{cliente}/estadoCivil")
    public ResponseEntity<List<EstadoCivil>> getEstadoCiviles(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findEstadoCiviles());
    }

    @GetMapping("/{cliente}/especialidad")
    public ResponseEntity<List<Especialidad>> getEspecialidades(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findEspecialidades());
    }

    @GetMapping("/{cliente}/profesional")
    public ResponseEntity<List<Profesional>> getProfesionales(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findProfesionales());
    }

    @GetMapping("/{cliente}/profesionalDisponible")
    public ResponseEntity<List<Profesional>> getProfesionalesDisponibles(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findProfesionalesDisponibles());
    }


}
