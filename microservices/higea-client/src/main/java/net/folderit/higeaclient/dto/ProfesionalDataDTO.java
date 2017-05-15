package net.folderit.higeaclient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalDataDTO {
    private List<RowProfesionalDTO> rows;
}
