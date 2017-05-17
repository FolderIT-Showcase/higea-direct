package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DataDto {


    private String tipoPersona;
    private String nombre;
    private String numeroDocumento;
    private DomicilioAfipDto domicilioFiscal;
}
