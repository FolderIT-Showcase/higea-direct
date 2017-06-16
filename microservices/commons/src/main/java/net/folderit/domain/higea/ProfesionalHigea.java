package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Profesional;

import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ProfesionalHigea implements Serializable {

    private int profesional_id;
    private String persona_apellido;
    private String persona_documento_nro;
    private String profesional_clinica;
    private String persona_nombres;
    private int especialidad_id;
    private int servicio_id;

    public Profesional convert() {
        Profesional profesional = new Profesional();
        profesional.setApellido(getPersona_apellido());
        profesional.setId((long) getProfesional_id());
        profesional.setNombre(getPersona_nombres());
        profesional.setEspecialidadId((long) especialidad_id);
        profesional.setServicioId((long)servicio_id);
        return profesional;
    }
}
