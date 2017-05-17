package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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


    public PrefesionalCoreDTO converterToProfesionalCore(){
        PrefesionalCoreDTO prefesionalCoreDTO = new PrefesionalCoreDTO();

        prefesionalCoreDTO.setApellido(getPersona_apellido());
        prefesionalCoreDTO.setId(Long.valueOf(getProfesional_id()));
        prefesionalCoreDTO.setNombre(getPersona_nombres());

        return prefesionalCoreDTO;
    }
}
