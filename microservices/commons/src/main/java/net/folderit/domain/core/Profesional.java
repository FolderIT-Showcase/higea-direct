package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "profesional")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
@EqualsAndHashCode(exclude={"especialidadId", "servicioId"})
public class Profesional implements Serializable {

    @Id
    private Long id;
    private String apellido;
    private String nombre;
    @Transient
    private Long especialidadId;
    private Long servicioId;

    public void finalize() throws Throwable {

    }
}//end Profesional