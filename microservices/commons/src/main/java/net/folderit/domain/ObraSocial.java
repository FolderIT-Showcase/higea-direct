package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * Created by luis on 24/05/17.
 */
@Entity
@Table(name = "obra_social")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ObraSocial {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombre;

    private String razon_social;

    private int codigo;

    @OneToMany()
    @JoinTable
            (
                    name = "os_plan",
                    joinColumns = {@JoinColumn(name = "os_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "plan_id", referencedColumnName = "id", unique = false)}
            )
    private List<Plan> planes;

}
