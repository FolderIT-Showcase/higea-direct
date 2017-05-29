package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * @author Luis Bonsembiante
 * @version 1.0
 * @created 18-abr.-2017 11:26:32 a. m.
 */
@Entity
@Table(name = "turno")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Turno implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date dia;

    private Date fecha;

    private Date hora;

    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "centro_id")
    private CentroSalud centroSalud;

    @ManyToOne
    @JoinColumn(name = "especialidad_id")
    private Especialidad especialidad;

    @ManyToOne
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "tipo_turno_id")
    private TipoTurno tipoTurno;

    @Column(name = "enabled")
    private boolean enabled = Boolean.TRUE;

    @Column(name = "tomado")
    private boolean tomado = Boolean.FALSE;

    private String codigo;

    public void finalize() throws Throwable {

    }


}//end Turno