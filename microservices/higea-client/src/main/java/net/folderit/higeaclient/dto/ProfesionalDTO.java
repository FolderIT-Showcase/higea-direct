package net.folderit.higeaclient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalDTO {

    private Boolean result;

    private String err;

    private ProfesionalDataDTO data;


}
