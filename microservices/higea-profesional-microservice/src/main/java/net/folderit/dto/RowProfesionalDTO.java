package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.Profesional;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RowProfesionalDTO implements Serializable {

    private String persona_apellido;
    private String persona_documento_nro;
    private int profesional_id;
    private String profesional_clinica;
    private String persona_nombres;
    private int especialidad_id;


    public Profesional converterRoProfesionalCore(){
        Profesional profesionalCoreDTO = new Profesional();
        profesionalCoreDTO.setApellido(getPersona_apellido());
        profesionalCoreDTO.setId(Long.valueOf(getProfesional_id()));
        profesionalCoreDTO.setNombre(getPersona_nombres());
        return profesionalCoreDTO;
    }
}
