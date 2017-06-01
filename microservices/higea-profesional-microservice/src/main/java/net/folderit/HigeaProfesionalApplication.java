package net.folderit;

import net.folderit.connection.ConnectionMidleWare;
import net.folderit.domain.core.Profesional;
import net.folderit.domain.higea.ProfesionalHigea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@EnableEurekaClient
@RestController
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class HigeaProfesionalApplication {

    private final ConnectionMidleWare connectionMidleWare;

    @Autowired
    public HigeaProfesionalApplication(ConnectionMidleWare connectionMidleWare) {
        this.connectionMidleWare = connectionMidleWare;
    }

    public static void main(String[] args) {
        SpringApplication.run(HigeaProfesionalApplication.class, args);
    }

    @RequestMapping("/{cliente}")
    public List<Profesional> profesionalesCore(@PathVariable("cliente") String codigo) {
        return connectionMidleWare.getProfesionales(codigo);
    }

    @RequestMapping("/{cliente}/profesionales")
    public List<ProfesionalHigea> profesionalesHigea(@PathVariable("cliente") String codigo) {
        return connectionMidleWare.getProfesionalesHigea(codigo);
    }

}
