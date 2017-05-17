package net.folderit.converters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by luis on 17/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataCoreDTO {

    List<ProfesionalCoreDTO> data;
}
