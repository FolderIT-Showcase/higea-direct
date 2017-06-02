package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

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

    //    @JsonFormat(pattern = "EEEE", timezone = "America/Buenos_Aires")
    @DateTimeFormat(pattern = "EEEE")
    private Date dia;

    /* @JsonFormat(pattern="yyyy-MM-dd",timezone="America/Buenos_Aires")*/
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fecha;

    //@JsonFormat(pattern="HH:mm:ss",timezone="America/Buenos_Aires")
    @DateTimeFormat(pattern = "HH:mm:ss")
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "motivo_turno_id")
    private MotivoTurno motivoTurno;

    @Column(name = "enabled")
    private boolean enabled = Boolean.TRUE;

    @Column(name = "tomado")
    private boolean tomado = Boolean.FALSE;

    private String codigo;

    public void finalize() throws Throwable {

    }


}//end Turno