package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "obra_social")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ObraSocial {


    @Id
    private Long id;

    private String nombre;

    private String razon_social;

    private int codigo;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "os_plan",
                    joinColumns = {@JoinColumn(name = "os_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "plan_id", referencedColumnName = "id", unique = false)}
            )
    private List<Plan> planes;

}
