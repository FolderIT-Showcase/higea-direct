package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.higea.TurnoHigea;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.S'Z'")
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

    @Transient
    private int duracion;

    @Transient
    private int tipoTurno;

    @Transient
    private int servicio;

    public void finalize() throws Throwable {

    }

    public TurnoHigea convertHigea(Long estado, Long pacienteId) {
        TurnoHigea turnoHigea = new TurnoHigea();
        turnoHigea.setTurnos_id(id);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        turnoHigea.setTurno_fecha(df.format(fecha));
        df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        turnoHigea.setTurno_hora(df.format(hora));
        turnoHigea.setPersona_observaciones(observaciones);
        turnoHigea.setEspecialidad_id(especialidad.getId());
        turnoHigea.setProfesional_id(profesional.getId());
        turnoHigea.setPlan_os_id(plan.getId());
        turnoHigea.setEstado_turno_id(estado);
        turnoHigea.setTurno_duracion(duracion);
        // TODO asignado estatico como 'otros'
        turnoHigea.setTipo_turno_fac_id((long) 3);
        turnoHigea.setTot_id((long) 1);
        turnoHigea.setTurno_tipo_turno(motivoTurno.getId());
        turnoHigea.setServicio_id((long) servicio);
        turnoHigea.setPaciente_id(pacienteId);
        return turnoHigea;
    }

}