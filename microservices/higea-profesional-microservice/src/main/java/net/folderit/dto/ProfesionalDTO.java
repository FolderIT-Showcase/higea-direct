package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.converters.PrefesionalCoreDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalDTO {

    private Boolean result;

    private String err;

    private ProfesionalDataDTO data;

}
