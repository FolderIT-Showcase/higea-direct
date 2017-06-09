package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Especialidad;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class EspecialidadHigea {

    Long especialidad_id;
    String especialidad_nombre;
    String especialidad_abreviatura;
    String especialidad_observaciones;

    public Especialidad convert() {
        Especialidad especialidad = new Especialidad();
        especialidad.setId(getEspecialidad_id());
        especialidad.setNombre(getEspecialidad_nombre());
        return especialidad;
    }
}
