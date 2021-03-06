package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "centro_salud")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class CentroSalud implements Serializable {

    @ManyToMany()
    @JoinTable
            (
                    name = "centro_especialidad",
                    joinColumns = {@JoinColumn(name = "centro_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "especialidad_id", referencedColumnName = "id", unique = false)}
            )
    public List<Especialidad> especialidad;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;

    public void finalize() throws Throwable {

    }
}//end CentroSalud