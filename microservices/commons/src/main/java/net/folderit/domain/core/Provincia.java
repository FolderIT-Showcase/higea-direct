package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Entity
@Table(name = "provincia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Provincia implements Serializable {

    @ManyToOne
    @JoinColumn(name = "pais_id")
    public Pais pais;
    @Id
    private Long id;
    private String nombre;
    private Integer codigo;

    public void finalize() throws Throwable {

    }
}//end Provincia