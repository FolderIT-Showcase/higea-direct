package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.ObraSocial;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ObraSocialHigea {
    private int obra_social_id;
    private String empresa_nombre;

    public ObraSocial convert() {
        ObraSocial obraSocial = new ObraSocial();
        obraSocial.setId(((long) this.obra_social_id));
        obraSocial.setNombre(this.empresa_nombre);
        obraSocial.setCodigo(obra_social_id);
        return obraSocial;
    }
}
