package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Turno implements Serializable {
    private Long id;
    private Date dia;
    private Date fecha;
    private Date hora;
    private String observaciones;
    private CentroSalud centroSalud;
    private Especialidad especialidad;
    private Profesional profesional;
    private boolean enabled = Boolean.TRUE;
    private boolean tomado = Boolean.FALSE;
}