package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.CentroSalud;
import net.folderit.domain.core.Especialidad;
import net.folderit.domain.core.Profesional;
import net.folderit.domain.core.Turno;
import org.joda.time.DateTime;
import org.joda.time.DateTimeFieldType;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormatter;

import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurnoHigea {

    private Long especialidad_id;
    private String especialidad_nombre;
    private String especialidad_abreviatura;
    private String especialidad_observaciones;
    private String persona_apellido;
    private String persona_nombres;
    private String persona_documento_nro;
    private String profesional_clinica;
    private String persona_fecha_ingreso;
    private String persona_observaciones;

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
    private Long turno_tipo_turno;
    private String turno_fecha;
    private String turno_hora;

    private String turno_sobreturno;
    private String turno_hora_actual;
    private int turno_primera_vez;
    private int turno_duracion;
    private int turno_factor_duracion;
    private String turno_asistencia;
    private String turno_pasado;

    private String paciente_nro_doc;
    private String paciente_nro_tel;
    private String paciente_nro_afil;

    public Turno convert(List<Profesional> profesionales) {
        Turno mTurno = new Turno();
        mTurno.setId(this.getTurnos_id());
        // TODO: ver formato fecha y hora
        String dateStr = this.getTurno_fecha();
        String horaStr = this.getTurno_hora();
        LocalDate cal = getTime(dateStr);
        DateTime hour = getHour(horaStr);
        mTurno.setDia(new GregorianCalendar(cal.getYear(), cal.getMonthOfYear(), cal.getDayOfMonth()).getTime());
        mTurno.setFecha(new GregorianCalendar(cal.getYear(), cal.getMonthOfYear(), cal.getDayOfMonth()).getTime());
        mTurno.setHora(
                new GregorianCalendar(cal.getYear(), cal.getMonthOfYear(), cal.getDayOfMonth(),
                        hour.get(DateTimeFieldType.hourOfDay()), hour.get(DateTimeFieldType.minuteOfHour())).getTime());
        mTurno.setObservaciones(getEspecialidad_observaciones());
        mTurno.setCentroSalud(getCentroSalud());
        mTurno.setEspecialidad(getEspecialidad());
        // TODO: pedir o no perdir datos del profesional ?
        profesionales.forEach(y -> {
            if (Objects.equals(y.getId(), this.getProfesional_id())) {
                mTurno.setProfesional(y);
            }
        });

        mTurno.setEnabled(true);
        mTurno.setTomado(false);
        return mTurno;
    }

    private LocalDate getTime(String date) {
        DateTimeFormatter formatter = org.joda.time.format.DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'")
                .withLocale(Locale.UK);
        return formatter.parseLocalDate(date);
    }

    private DateTime getHour(String hora) {
        DateTimeFormatter formatter = org.joda.time.format.DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'")
                .withLocale(Locale.UK);
        return formatter.parseDateTime(hora);
    }

    private CentroSalud getCentroSalud() {
        return new CentroSalud();
    }

    private Especialidad getEspecialidad() {
        Especialidad especialidad = new Especialidad();
        especialidad.setId(getEspecialidad_id());
        especialidad.setNombre(getEspecialidad_nombre());
        return especialidad;
    }

}
