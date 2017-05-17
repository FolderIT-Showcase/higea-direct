package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.enums.EstadoCivil;
import net.folderit.domain.enums.Genero;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "persona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Persona implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String apellido;

    private Date fechaNacimiento;

    private Genero genero;

    private String nombre;

    @Column(name = "enabled")
    private boolean enabled = Boolean.TRUE;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User userAsociado;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "documento_id")
    private Documento documento;

    private EstadoCivil estadoCivil;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domicilio_id")
    private Domicilio domicilio;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "persona_integrante",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "integrante_id", referencedColumnName = "id", unique = false)}
            )
    private List<Persona> integrantes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "persona_contacto",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "contacto_id", referencedColumnName = "id", unique = false)}
            )
    private List<Contacto> contacto;

    @ManyToMany
    @JoinTable
            (
                    name = "persona_turno",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "turno_id", referencedColumnName = "id", unique = false)}
            )
    private List<Turno> turno;


    public void finalize() throws Throwable {

    }
}//end Persona