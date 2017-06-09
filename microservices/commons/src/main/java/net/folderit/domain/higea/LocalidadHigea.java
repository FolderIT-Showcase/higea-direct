package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Localidad;
import net.folderit.domain.core.Provincia;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class LocalidadHigea {

    private int localidad_id;
    private int provincia_id;
    private String localidad_nombre;
    private String localidad_codigo_postal;

    public Localidad convert() {
        Localidad localidad = new Localidad();
        Provincia provincia = new Provincia();
        provincia.setId((long) provincia_id);
        localidad.setProvincia(provincia);
        localidad.setId((long) localidad_id);
        localidad.setNombre(localidad_nombre);
        if (localidad_codigo_postal != null) {
            localidad.setCodPostal(Integer.parseInt(localidad_codigo_postal));
        }
        return localidad;
    }

}
