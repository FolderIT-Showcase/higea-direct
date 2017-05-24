package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * Created by luis on 24/05/17.
 */
@Entity
@Table(name = "tipo_turno")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class TipoTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int codigo;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "motivo_turno_id")
    private MotivoTurno motivoTurno;
}
