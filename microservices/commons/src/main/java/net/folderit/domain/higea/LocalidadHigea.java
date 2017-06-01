package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Localidad;
import net.folderit.domain.core.Provincia;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
        localidad.setCodPostal(Integer.parseInt(localidad_codigo_postal));
        return localidad;
    }

}
