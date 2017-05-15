package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ResultAfipDto {

    private String result;

    private DataDto data;
}
