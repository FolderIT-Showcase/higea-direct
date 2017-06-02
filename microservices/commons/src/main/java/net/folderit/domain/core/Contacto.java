package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.enums.TipoContacto;

import javax.persistence.*;
import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

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