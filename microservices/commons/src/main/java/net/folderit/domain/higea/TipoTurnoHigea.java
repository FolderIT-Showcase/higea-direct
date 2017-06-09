package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.TipoTurno;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class TipoTurnoHigea {
    private int tipo_turno_fac_id;
    private String tipo_turno_fac_nombre;

    public TipoTurno convert() {
        TipoTurno tipoTurno = new TipoTurno();
        tipoTurno.setId((long) this.tipo_turno_fac_id);
        tipoTurno.setDescripcion(this.tipo_turno_fac_nombre);
        return tipoTurno;
    }
}
