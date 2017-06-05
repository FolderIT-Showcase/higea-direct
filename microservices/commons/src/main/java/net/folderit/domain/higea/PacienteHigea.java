package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteHigea {

    private Long paciente_id=0L;
    private Long plan_os_id_1=0L;
    private Long plan_os_id_2=0L;
    private Long plan_os_id_3=0L;
    private Long pais_id=0L;
    private Long provincia_id=0L;
    private Long localidad_id=0L;
    private Long estado_civil_id=0L;
    private Long documento_id=0L;
    private String persona_apellido="";
    private String persona_nombres="";
    private String persona_fecha_nacimiento="";
    private String persona_sexo="N";
    private String persona_documento_nro="";
    private String persona_telefono_part_nro="";
    private String persona_telefono_cel_nro="";
    private String persona_telefono_lab_nro="";
    private String persona_calle_texto="";
    private String persona_calle_nro="";
    private String persona_departamento_nro="";
    private String persona_piso_nro="";
    private String persona_email="";
    private String paciente_os_afiliado1_nro="";
    private String paciente_os_afiliado2_nro="";
    private String paciente_os_afiliado3_nro="";

}
