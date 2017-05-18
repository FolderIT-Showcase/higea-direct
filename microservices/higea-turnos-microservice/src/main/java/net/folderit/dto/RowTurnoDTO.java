package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RowTurnoDTO {

    private Long turnos_id;
    private Long paciente_id;
    private Long profesional_id;
    private Long efector_id;
    private Long grupo_atencion_id;
    private Long servicio_id;
    private Long obra_social_id;
    private Long plan_os_id;
    private Long estado_turno_id;
    private Long derivador_id;
    private Long tipo_turno_fac_id;
    private Long tot_id;

    private String turno_fecha;
    private String turno_hora;

    private String turno_sobreturno;
    private String turno_hora_actual;
    private int turno_primera_vez;
    private int turno_duracion;
    private int turno_factor_duracion;
    private String turno_asistencia;
    private String turno_pasado;

    public Turno convert(ArrayList<Profesional> profesionales){
        Turno mTurno = new Turno();
        mTurno.setId(this.getTurnos_id());
        // TODO: ver formato fecha y hora
        Calendar cal = Calendar.getInstance();
        String dateStr = this.getTurno_fecha();
        mTurno.setFecha(
                new GregorianCalendar(Integer.parseInt(""),
                        Integer.parseInt(""),
                        Integer.parseInt("")).getTime());
        mTurno.setHora(
                new GregorianCalendar(Integer.parseInt(""),
                        Integer.parseInt(""),
                        Integer.parseInt("")).getTime());
        mTurno.setObservaciones(" - ");
        mTurno.setCentroSalud(null);
        mTurno.setEspecialidad(null);
        // TODO: pedir o no perdir datos del profesional ?


        profesionales.forEach(y -> {
            if(Objects.equals(y.getId(), this.getProfesional_id())){
                mTurno.setProfesional(y);
            }
        });

        mTurno.setEnabled(true);
        mTurno.setTomado(false);
        return mTurno;
    }

}
