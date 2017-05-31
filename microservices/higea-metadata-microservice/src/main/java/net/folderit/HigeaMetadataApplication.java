package net.folderit;

import net.folderit.domain.ObraSocial;
import net.folderit.domain.TipoTurno;
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
        return ResponseEntity.ok(metadataService.findAllObrasSociales(codigo));
    }

    @GetMapping("/{cliente}/tipoTurnoFac")
    public ResponseEntity<List<TipoTurno>> getTiposTurnoFac(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(metadataService.findTiposTurnoFac(codigo));
    }

}
