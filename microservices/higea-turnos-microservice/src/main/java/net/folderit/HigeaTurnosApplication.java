package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.Turno;
import net.folderit.dto.FilterDto;
import net.folderit.dto.TurnoDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class HigeaTurnosApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaTurnosApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }
    public static void main(String[] args) {
        SpringApplication.run(HigeaTurnosApplication.class, args);
    }

//    @RequestMapping("/{cliente}/turnos")
//    public TurnoDataDTO turnos(@PathVariable("cliente") String codigo) {
//        return connectionMidleWare.turnos(codigo);
//    }

    @PostMapping("/{cliente}/turnos")
    public ResponseEntity<Collection<Turno>> getAll(@PathVariable("cliente") String codigo, @RequestBody FilterDto filterDto) {
        List<Turno> turnos = connectionMidleWare.finAllBy(codigo, filterDto);
        return ResponseEntity.ok(turnos);
    }
}
