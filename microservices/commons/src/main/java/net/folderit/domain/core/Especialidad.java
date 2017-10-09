package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "especialidad")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Especialidad implements Serializable {

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable
            (
                    name = "especialidad_profesional",
                    joinColumns = {@JoinColumn(name = "especilidad_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "profesional_id", referencedColumnName = "id", unique = false)}
            )
    public List<Profesional> profesional;
    @Id
    private Long id;
    private String nombre;

    public void finalize() throws Throwable {

    }

    @Override public boolean equals(Object o) {
        Especialidad espToComp = (Especialidad) o;
        if(espToComp.id.equals(this.id)){
            if (espToComp.nombre.equals(this.nombre)){
                return true;
            }
        }
        return false;
    }

}//end Especialidad