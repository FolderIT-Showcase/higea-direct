package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.higea.TurnoHigea;

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
    @JoinColumn(name = "motivo_turno_id")
    private MotivoTurno motivoTurno;

    @Column(name = "enabled")
    private boolean enabled = Boolean.TRUE;

    @Column(name = "tomado")
    private boolean tomado = Boolean.FALSE;

    private String codigo;

    public void finalize() throws Throwable {

    }

    public TurnoHigea convertHigea() {
        TurnoHigea turnoHigea = new TurnoHigea();
        turnoHigea.setTurnos_id(id);
        // TODO ver formato de fecha higea
        // turnoHigea.setTurno_fecha(new SimpleDateFormat("dd/MM/yyyy").format(fecha));
        turnoHigea.setTurno_fecha(fecha.toString());
        turnoHigea.setTurno_hora(hora.toString());
        turnoHigea.setPersona_observaciones(observaciones);
        turnoHigea.setEspecialidad_id(especialidad.getId());
        turnoHigea.setProfesional_id(profesional.getId());
        turnoHigea.setPlan_os_id(plan.getId());
        turnoHigea.setServicio_id(motivoTurno.getId());
        return turnoHigea;
    }

}