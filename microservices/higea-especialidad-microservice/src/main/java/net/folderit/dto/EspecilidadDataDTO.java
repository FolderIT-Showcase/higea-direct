package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.converters.EspecialidadCoreDTO;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EspecilidadDataDTO {

    List<EspecialidadesRow> rows;


}
