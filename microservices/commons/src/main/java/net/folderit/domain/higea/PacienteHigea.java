package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Contacto;
import net.folderit.domain.core.Persona;
import net.folderit.domain.core.Plan;
import net.folderit.domain.core.enums.Genero;

import java.util.ArrayList;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class PacienteHigea {

    private Long paciente_id;
    private Long plan_os_id_1;
    private Long plan_os_id_2;
    private Long plan_os_id_3;
    private Long pais_id;
    private Long provincia_id;
    private Long localidad_id;
    private Long estado_civil_id;
    private Long documento_id;
    private String persona_apellido;
    private String persona_nombres;
    private String persona_fecha_nacimiento;
    private String persona_sexo;
    private String persona_documento_nro;
    private String persona_telefono_part_nro;
    private String persona_telefono_cel_nro;
    private String persona_telefono_lab_nro;
    private String persona_calle_texto;
    private String persona_calle_nro;
    private String persona_departamento_nro;
    private String persona_piso_nro;
    private String persona_email;
    private String paciente_os_afiliado1_nro;
    private String paciente_os_afiliado2_nro;
    private String paciente_os_afiliado3_nro;

    public Persona convert() {
        Persona persona = new Persona();
        Contacto contacto = new Contacto();
        contacto.setDato(persona_telefono_part_nro);
        ArrayList<Contacto> contactos = new ArrayList<>();
        contactos.add(contacto);
        persona.setContacto(contactos);
        persona.setApellido(persona_apellido);
        persona.setNombre(getPersona_nombres());
        Plan plan = new Plan();
        plan.setId(plan_os_id_1);
        persona.setPlan(plan);
        persona.setExternalId(paciente_id);
        if(persona_sexo!=null){
            switch (persona_sexo) {
                case "N":
                    persona.setGenero(Genero.MASCULINO);
                    break;
                case "S":
                    persona.setGenero(Genero.FEMENINO);
                    break;
                default:
                    persona.setGenero(Genero.OTROS);
                    break;
            }
    }else  persona.setGenero(null);


        return persona;
    }

}
