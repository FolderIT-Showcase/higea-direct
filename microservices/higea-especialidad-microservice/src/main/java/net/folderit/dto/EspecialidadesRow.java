package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.converters.EspecialidadCoreDTO;
import net.folderit.domain.Especialidad;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadesRow {

    Long especialidad_id;
    String especialidad_nombre;
    String especialidad_abreviatura;
    String especialidad_observaciones;

    public Especialidad convertToEspecialidadCoreDTO(){
        Especialidad especialidad = new Especialidad();
        especialidad.setId(getEspecialidad_id());
        especialidad.setNombre(getEspecialidad_nombre());
        return especialidad;

    }
}
