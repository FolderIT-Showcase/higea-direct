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
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto implements Serializable {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.S'Z'", timezone = "America/Buenos_Aires")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.S'Z'", iso = DateTimeFormat.ISO.DATE_TIME)
    Date fecha;
    CentroSalud centroSalud;
    Especialidad especialidad;
    Profesional profesional;

    public String getFilterParameters() {
        String query = "";

        if (fecha != null) {
            query += "agenda_fecha=" + getFecha() + "&";
        }
        if (getProfesional() != null) {
            query += "profesional_id=" + profesional.getId();
        }

        return query;
    }


}
