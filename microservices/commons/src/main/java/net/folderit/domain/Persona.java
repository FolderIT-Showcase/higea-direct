package net.folderit.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.enums.EstadoCivil;
import net.folderit.domain.enums.Genero;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Persona implements Serializable {
    private Long id;
    private String apellido;
    private Date fechaNacimiento;
    private Genero genero;
    private String nombre;
    private boolean enabled = Boolean.TRUE;
    private User userAsociado;
    private Documento documento;
    private EstadoCivil estadoCivil;
    private Domicilio domicilio;
    private List<Persona> integrantes;
    private List<Contacto> contacto;
    private List<Turno> turno;
}