package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Localidad;
import net.folderit.domain.core.Provincia;
import net.folderit.domain.core.enums.EstadoCivil;

/**
 * Creat
 * ed by luis on 02/06/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstadoCivilHigea {

    Long estado_civil_id;
    String estado_civil_nombre;

    public EstadoCivil convert() {

        EstadoCivil estadoCivil = null;

        if(getEstado_civil_id().equals(1L)){
            estadoCivil = EstadoCivil.Casado;
        }else  if(getEstado_civil_id().equals(2L)){
            estadoCivil = EstadoCivil.Soltero;
        }else if(getEstado_civil_id().equals(3L)){
            estadoCivil = EstadoCivil.Viudo;
        }else if(getEstado_civil_id().equals(4L)){
            estadoCivil = EstadoCivil.Divorciado;
        }else if(getEstado_civil_id().equals(5L)){
            estadoCivil = EstadoCivil.Unidad_de_Hecho;
        }else if(getEstado_civil_id().equals(6L)){
            estadoCivil = EstadoCivil.Separado;
        }

        return estadoCivil;
    }
}
