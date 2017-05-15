package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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


}
