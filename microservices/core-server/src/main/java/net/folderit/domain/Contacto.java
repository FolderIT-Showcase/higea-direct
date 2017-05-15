package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.enums.TipoContacto;

import javax.persistence.*;
import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * @author Luis Bonsembiante
 * @version 1.0
 * @created 18-abr.-2017 11:26:34 a. m.
 */
@Entity
@Table(name = "contacto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Contacto implements Serializable {

    public TipoContacto tipoContacto;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dato;

    public void finalize() throws Throwable {

    }
}//end Contacto