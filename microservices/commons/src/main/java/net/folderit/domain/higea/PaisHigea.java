package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Pais;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
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
