package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by luis on 13/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalDataDTO {

    private List<RowProfesionalDTO> rows;


}
