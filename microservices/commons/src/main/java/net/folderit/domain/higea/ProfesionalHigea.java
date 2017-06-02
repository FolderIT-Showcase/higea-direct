package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Profesional;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalHigea implements Serializable {

    private String persona_apellido;
    private String persona_documento_nro;
    private int profesional_id;
    private String profesional_clinica;
    private String persona_nombres;
    private int especialidad_id;


    public Profesional convert() {
        Profesional profesional = new Profesional();
        profesional.setApellido(getPersona_apellido());
        profesional.setId((long) getProfesional_id());
        profesional.setNombre(getPersona_nombres());
        return profesional;
    }
}
