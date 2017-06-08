package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.MotivoTurno;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class MotivoTurnoHigea {

    private Long tipo_consulta_id;
    private Long tcg_id;
    private Long servicio_id;
    private String tipo_consulta_nombre;
    private String tipo_consulta_abreviatura;
    private String tipo_consulta_sincargo;
    private String tipo_consulta_factor_duracion;
    private String tipo_consulta_consulta;
    private String tipo_consulta_usa_equipo;


    public MotivoTurno convert() {
        MotivoTurno motivoTurno = new MotivoTurno();
        motivoTurno.setId((long) this.tcg_id );
        motivoTurno.setDescripcion(this.tipo_consulta_nombre);
        motivoTurno.setCodigo(this.tcg_id.intValue());
        motivoTurno.setPreparacion(null);
        motivoTurno.setCoseguro(0D);
        return motivoTurno;
    }
}
