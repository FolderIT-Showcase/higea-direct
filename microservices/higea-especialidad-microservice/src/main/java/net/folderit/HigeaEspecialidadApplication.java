package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.dto.EspecialidadDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class HigeaEspecialidadApplication {

    @Autowired
    private ConnectionMidleWare connectionMidleWare;

    public static void main(String[] args) {
        SpringApplication.run(HigeaEspecialidadApplication.class, args);
    }

    @RequestMapping("/{cliente}/especialidades")
    public ResponseEntity<EspecialidadDTO> especialidades(@PathVariable("cliente") String codigo) {
        return connectionMidleWare.especialidades(codigo);
    }


}
