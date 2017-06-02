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

    public String getFilterParameters() {
        String query = "";


        if (getFecha() != null && !getFecha().isEmpty()) {
            query += "turno_fecha=" + getFecha() + "&";
        }
        if (getEspecialidad() != null) {
            query += "especialidad_id=" + getEspecialidad().getId() + "&";
        }
        if (getProfesional() != null) {
            query += "profesional_id=" + getProfesional().getId();
        }

        return query;
    }


}
