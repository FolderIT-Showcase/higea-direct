package net.folderit.web;

import net.folderit.domain.core.TurneroException;
import net.folderit.util.OnSobreTurnoEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created by luis on 07/07/17.
 */
@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class ManagmentController {

    final ApplicationEventPublisher eventPublisher;

    @Autowired
    public ManagmentController(ApplicationEventPublisher eventPublisher) {

        this.eventPublisher = eventPublisher;
    }

    @PostMapping("/managment/sobreturno")
    public ResponseEntity sobreTurno(@RequestParam("nombre") String nombre,
                                     @RequestParam("apellido") String apellido,
                                     @RequestParam("email") String email,
                                     @RequestParam("telefono") String telefono, @RequestParam("fecha") Date fecha
                                     ) {

        try {

            eventPublisher.publishEvent(new OnSobreTurnoEvent
                    (fecha, email, nombre, apellido, telefono));
        } catch (Exception me) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_ERROR_GENERIC, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }
        return ResponseEntity.status(HttpStatus.OK).body(email);
    }

}
