package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by luis on 12/05/17.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadDTO {

    private Boolean result;

    private List<EspecilidadDataDTO> especilidadDataDTO;
}
