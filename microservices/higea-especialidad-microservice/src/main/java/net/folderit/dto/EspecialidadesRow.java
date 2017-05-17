package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.converters.EspecialidadCoreDTO;

/**
 * Created by luis on 17/05/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadesRow {

    Long especialidad_id;
    String especialidad_nombre;
    String especialidad_abreviatura;
    String especialidad_observaciones;

    public EspecialidadCoreDTO convertToEspecialidadCoreDTO(){
        EspecialidadCoreDTO especialidadCoreDTO = new EspecialidadCoreDTO();
        especialidadCoreDTO.setId(getEspecialidad_id());
        especialidadCoreDTO.setNombre(getEspecialidad_nombre());
        return especialidadCoreDTO;

    }
}
