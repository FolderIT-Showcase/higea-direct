package net.folderit.converters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.dto.PrefesionalCoreDTO;

import java.util.List;

/**
 * Created by luis on 17/05/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadCoreDTO {


    public List<PrefesionalCoreDTO> profesional;
    private Long id;
    private String nombre;


}
