package net.folderit.converters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.Profesional;

import java.util.List;

/**
 * Created by luis on 17/05/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadCoreDTO {


    public List<Profesional> profesional;
    private Long id;
    private String nombre;


}
