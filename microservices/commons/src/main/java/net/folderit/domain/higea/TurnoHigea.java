package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
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
    private int turno_factor_duracion = 1;
    private String turno_asistencia;
    private String turno_pasado;

    private String paciente_nro_doc;
    private String paciente_nro_tel;
    private String paciente_nro_afil;

    public Turno convert(List<Profesional> profesionales, MotivoTurno motivoTurno) {
        Turno mTurno = new Turno();
        mTurno.setId(this.getTurnos_id());
        // TODO: ver formato fecha y hora
        String dateStr = this.getTurno_fecha();
        String horaStr = this.getTurno_hora();
        mTurno.setDia(getTime(dateStr));
        mTurno.setFecha(getTime(dateStr));
        mTurno.setHora(getHour(horaStr));
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
        if (motivoTurno == null) {
            motivoTurno = new MotivoTurno();
            Preparacion preparacion = new Preparacion();
            motivoTurno.setPreparacion(preparacion);
            motivoTurno.setId(tipo_turno_fac_id);
        }
        mTurno.setMotivoTurno(motivoTurno);
        mTurno.setMotivoTurno(motivoTurno);
        mTurno.setDuracion(turno_duracion);
        mTurno.setServicio(Math.toIntExact(servicio_id));
        return mTurno;
    }

    private Date getTime(String date) {
        Date mDate = null;
        SimpleDateFormat simpleDateFormat = null;
        if (date.length() <= 10) {
            simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        } else {
            simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.S'Z'");
        }

        try {
            mDate = simpleDateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return mDate;
    }

    private Date getHour(String hour) {
        Date mDate = null;
        SimpleDateFormat simpleDateFormat = null;
        if (hour.length() <= 10) {
            simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
        } else {
            simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.S'Z'");
        }

        try {
            mDate = simpleDateFormat.parse(hour);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return mDate;
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
