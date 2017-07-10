package net.folderit.util;

import lombok.Data;
import org.springframework.context.ApplicationEvent;

import java.util.Date;
import java.util.Locale;

/**
 * Created by luis on 07/07/17.
 */
@Data
public class OnSobreTurnoEvent extends ApplicationEvent {


    private String email;
    private String nombre;
    private String fecha;
    private String apellido;
    private String telefono;

    public OnSobreTurnoEvent(
            String fecha, String email,  String nombre, String apellido, String telefono) {
         super(email);

        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.fecha = fecha;

    }
}
