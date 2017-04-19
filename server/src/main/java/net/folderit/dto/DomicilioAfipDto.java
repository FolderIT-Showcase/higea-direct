package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by gheng on 19/4/2017.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DomicilioAfipDto {

    private String direccion;
    private String localidad;
    private String codPostal;

}
