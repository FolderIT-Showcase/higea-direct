package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.CentroSalud;
import net.folderit.domain.core.Especialidad;
import net.folderit.domain.core.Profesional;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto implements Serializable {
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "America/Buenos_Aires")
    @DateTimeFormat(pattern = "yyyy-MM-dd", iso = DateTimeFormat.ISO.DATE_TIME)
    String fecha;
    CentroSalud centroSalud;
    Especialidad especialidad;
    Profesional profesional;
}
