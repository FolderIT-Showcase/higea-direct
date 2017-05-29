package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.ObraSocial;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ObraSocialHigea {
    private int obra_social_id;
    private String empresa_nombre;

    public ObraSocial convert() {
        ObraSocial obraSocial = new ObraSocial();
        obraSocial.setId(((long) this.obra_social_id));
        obraSocial.setNombre(this.empresa_nombre);
        return obraSocial;
    }
}
