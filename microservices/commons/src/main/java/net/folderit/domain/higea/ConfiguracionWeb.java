package net.folderit.domain.higea;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Pais;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ConfiguracionWeb {
    private int parweb_id;
    private String parweb_propiedad;
    private String parweb_valor;
    private String parweb_descripcion;
    private String parweb_tipo;
}
