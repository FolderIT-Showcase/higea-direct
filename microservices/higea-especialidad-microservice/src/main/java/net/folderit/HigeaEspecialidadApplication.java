package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Especialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@RestController
public class HigeaEspecialidadApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaEspecialidadApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaEspecialidadApplication.class, args);
    }

    @RequestMapping("/{cliente}")
    public ResponseEntity<List<Especialidad>> especialidades(@PathVariable("cliente") String codigo) {
        return ResponseEntity.ok(connectionMidleWare.especialidades());
    }


}
