package net.folderit.converters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Created by luis on 17/05/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrefesionalCoreDTO implements Serializable {


    private Long id;

    private String apellido;

    private String nombre;

}
