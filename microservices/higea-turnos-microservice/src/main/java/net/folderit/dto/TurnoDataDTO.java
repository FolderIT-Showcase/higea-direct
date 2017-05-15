package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by luis on 15/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurnoDataDTO {

    List<RowTurnoDTO> rows;
}
