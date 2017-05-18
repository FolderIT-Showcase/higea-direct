package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto implements Serializable {

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "America/Buenos_Aires")
    String fecha;
    CentroSalud centroSalud;
    Especialidad especialidad;
    Profesional profesional;
}
