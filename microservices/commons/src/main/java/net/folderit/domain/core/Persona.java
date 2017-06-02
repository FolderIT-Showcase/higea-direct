package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.enums.EstadoCivil;
import net.folderit.domain.core.enums.Genero;
import net.folderit.domain.core.enums.TipoContacto;
import net.folderit.domain.core.enums.TipoDocumento;
import net.folderit.domain.higea.PacienteHigea;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "persona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Persona implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String apellido;

    private Date fechaNacimiento;

    private Genero genero;

    private String nombre;

    @Column(name = "enabled")
    private boolean enabled = Boolean.TRUE;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User userAsociado;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "documento_id")
    private Documento documento;

    private EstadoCivil estadoCivil;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private Integer nroAfiliado;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domicilio_id")
    private Domicilio domicilio;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "persona_integrante",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "integrante_id", referencedColumnName = "id", unique = false)}
            )
    private List<Persona> integrantes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "persona_contacto",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "contacto_id", referencedColumnName = "id", unique = false)}
            )
    private List<Contacto> contacto;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
            (
                    name = "persona_turno",
                    joinColumns = {@JoinColumn(name = "persona_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "turno_id", referencedColumnName = "id", unique = false)}
            )
    private List<Turno> turno;


    public void finalize() throws Throwable {

    }


    public PacienteHigea convertToPacienteHigeaDTO() {

        PacienteHigea pacienteDTO = new PacienteHigea();
        pacienteDTO.setPaciente_id(this.getId());
        pacienteDTO.setPlan_os_id_1(getPlan() != null ? getPlan().getId() : null);
        pacienteDTO.setPais_id(getDomicilio() != null && getDomicilio().getLocalidad() != null && getDomicilio().getLocalidad().getProvincia() != null
                && getDomicilio().getLocalidad().getProvincia().getPais() != null ? getDomicilio().getLocalidad().getProvincia().getPais().getId() : null);
        pacienteDTO.setProvincia_id(getDomicilio() != null && getDomicilio().getLocalidad() != null && getDomicilio().getLocalidad().getProvincia() != null ? getDomicilio().getLocalidad().getProvincia().getId() : null);
        pacienteDTO.setLocalidad_id(getDomicilio() != null && getDomicilio().getLocalidad() != null ? getDomicilio().getLocalidad().getId() : null);
        // pacienteDTO.setEstado_civil_id(getEstadoCivil() != null ? getEstadoCivil().equals(EstadoCivil.Casado):null);
        pacienteDTO.setDocumento_id(getTipoDocID(getDocumento().getTipoDocumento()));
        pacienteDTO.setPersona_apellido(getApellido());
        pacienteDTO.setPersona_nombres(getNombre());
        pacienteDTO.setPersona_fecha_nacimiento(getFechaNacimiento() != null ? getFechaNacimiento().toString() : null);
        // pacienteDTO.setPersona_sexo(getGenero());
        pacienteDTO.setPersona_documento_nro(getDocumento() != null ? getDocumento().getNumero().toString() : "");
        pacienteDTO.setPersona_telefono_part_nro(getTipoContaco(TipoContacto.telefono));
        pacienteDTO.setPersona_telefono_cel_nro(getTipoContaco(TipoContacto.celular));
        pacienteDTO.setPersona_telefono_lab_nro(null);
        pacienteDTO.setPersona_calle_nro(getDomicilio() != null ? getDomicilio().getCalle() : null);
        pacienteDTO.setPersona_calle_texto(getDomicilio() != null ? getDomicilio().getCalle() : null);
        // pacienteDTO.setPersona_departamento_nro();
        pacienteDTO.setPersona_piso_nro(getDomicilio() != null ? getDomicilio().getPiso().toString() : null);
        pacienteDTO.setPersona_email(getTipoContaco(TipoContacto.mail));
        pacienteDTO.setPaciente_os_afiliado1_nro(getNroAfiliado().toString());
        pacienteDTO.setLocalidad_id(1L);

        return pacienteDTO;

    }

    public String getTipoContaco(TipoContacto tipoContacto) {
        String numeroTelefono = "";

        for (Contacto tipo : getContacto()) {
            if (tipo.getTipoContacto().equals(tipoContacto)) {
                numeroTelefono = tipo.getDato().toString();
            }
        }

        return numeroTelefono;
    }

    public Long getTipoDocID(TipoDocumento tipoDocumento) {
        if (tipoDocumento.equals(TipoDocumento.dni)) {
            return 1L;
        } else if (tipoDocumento.equals(TipoDocumento.cedulaIdentidad)) {
            return 7L;
        } else if (tipoDocumento.equals(TipoDocumento.documentoExtranjero)) {
            return 99L;
        } else if (tipoDocumento.equals(TipoDocumento.libretaEnrolamiento)) {
            return 12L;
        } else if (tipoDocumento.equals(TipoDocumento.pasaporte)) {
            return 13L;
        } else return 13L;
    }


}//end Persona