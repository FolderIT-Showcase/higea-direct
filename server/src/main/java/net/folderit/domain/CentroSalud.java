package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * @author Luis Bonsembiante
 * @version 1.0
 * @created 18-abr.-2017 11:26:20 a. m.
 */
@Entity
@Table(name = "centro_salud")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class CentroSalud implements Serializable {

    @ManyToOne
    @JoinColumn(name="especialidad_id")
    public Especialidad especialidad;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;

    public void finalize() throws Throwable {

    }
}//end CentroSalud