package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.TipoTurno;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoTurnoFac {
    private int tipo_turno_fac_id;
    private String tipo_turno_fac_nombre;

    public TipoTurno convert() {
        TipoTurno tipoTurno = new TipoTurno();
        tipoTurno.setId((long) this.tipo_turno_fac_id);
        tipoTurno.setDescripcion(this.tipo_turno_fac_nombre);
        return tipoTurno;
    }
}
