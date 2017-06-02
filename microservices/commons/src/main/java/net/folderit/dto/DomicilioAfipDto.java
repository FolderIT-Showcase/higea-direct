package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DomicilioAfipDto {
    private String direccion;
    private String localidad;
    private String codPostal;
}
