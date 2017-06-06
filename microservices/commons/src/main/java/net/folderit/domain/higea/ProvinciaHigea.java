package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Pais;
import net.folderit.domain.core.Provincia;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class ProvinciaHigea {

    private int provincia_id;
    private int pais_id;
    private String provincia_nombre;
    private String provincia_abreviatura;

    public Provincia convert() {
        Provincia provincia = new Provincia();
        provincia.setId((long) provincia_id);
        provincia.setNombre(provincia_nombre);
        Pais pais = new Pais();
        pais.setId((long) pais_id);
        provincia.setPais(pais);
        return provincia;
    }
}
