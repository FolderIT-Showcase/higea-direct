package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * @author Luis Bonsembiante
 * @version 1.0
 * @created 18-abr.-2017 11:26:24 a. m.
 */
@Entity
@Table(name = "especialidad")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Especialidad implements Serializable {


    @OneToMany
    @JoinTable
            (
                    name = "especialidad_profesional",
                    joinColumns = {@JoinColumn(name = "especilidad_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "profesional_id", referencedColumnName = "id", unique = false)}
            )
    public List<Profesional> profesional;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;

    public void finalize() throws Throwable {

    }
}//end Especialidad