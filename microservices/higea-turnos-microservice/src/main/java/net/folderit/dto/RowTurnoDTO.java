package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import org.joda.time.DateTime;
import org.joda.time.DateTimeFieldType;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormatter;

import java.util.*;

;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RowTurnoDTO {


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

    private String turno_fecha;
    private String turno_hora;

    private String turno_sobreturno;
    private String turno_hora_actual;
    private int turno_primera_vez;
    private int turno_duracion;
    private int turno_factor_duracion;
    private String turno_asistencia;
    private String turno_pasado;

    public Turno convert(List<Profesional> profesionales){
        Turno mTurno = new Turno();
        mTurno.setId(this.getTurnos_id());
        // TODO: ver formato fecha y hora
        String dateStr = this.getTurno_fecha();
        String horaStr = this.getTurno_hora();
        LocalDate cal = getTime(dateStr);
        DateTime hour = getHour(horaStr);
        mTurno.setDia(new GregorianCalendar(cal.getYear(),
                cal.getMonthOfYear(),
                cal.getDayOfMonth()).getTime());
        mTurno.setFecha( new GregorianCalendar(cal.getYear(),
                cal.getMonthOfYear(),
                cal.getDayOfMonth()).getTime());
        mTurno.setHora(
                new GregorianCalendar(cal.getYear(),
                        cal.getMonthOfYear(),
                        cal.getDayOfMonth(),hour.get(DateTimeFieldType.hourOfDay()),hour.get(DateTimeFieldType.minuteOfHour())).getTime());
        mTurno.setObservaciones(getEspecialidad_observaciones());
        mTurno.setCentroSalud(getCentroSalud());
        mTurno.setEspecialidad(getEspecialidad());
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

    private LocalDate getTime(String date){
        DateTimeFormatter formatter = org.joda.time.format.DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'")
                .withLocale(Locale.UK);

        LocalDate dateFormat = formatter.parseLocalDate(date);

        return dateFormat;
    }

    private DateTime getHour(String hora){
        DateTimeFormatter formatter = org.joda.time.format.DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'")
                .withLocale(Locale.UK);

        DateTime dateFormat = formatter.parseDateTime(hora);

        return dateFormat;
    }

    private CentroSalud getCentroSalud(){

        CentroSalud centro = new CentroSalud();

        return centro;
    }

    private Especialidad getEspecialidad(){

        Especialidad especialidad = new Especialidad();
        especialidad.setId(getEspecialidad_id());
        especialidad.setNombre(getEspecialidad_nombre());

        return  especialidad;

    }

}
