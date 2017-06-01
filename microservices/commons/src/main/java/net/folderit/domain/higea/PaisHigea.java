package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Pais;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaisHigea {

    private int pais_id;
    private String pais_nombre;
    private String pais_abreviatura;

    public Pais convert() {
        Pais pais = new Pais();
        pais.setId((long) pais_id);
        pais.setNombre(pais_nombre);
        return pais;
    }
}
