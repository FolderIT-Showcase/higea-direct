package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by luis on 13/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalDTO {

    private Boolean result;

    private String err;

    private ProfesionalDataDTO data;
}
