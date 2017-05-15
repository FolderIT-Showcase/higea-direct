package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by luis on 15/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurnoDTO {

    private Boolean result;

    private String err;

    private TurnoDataDTO data;
}
