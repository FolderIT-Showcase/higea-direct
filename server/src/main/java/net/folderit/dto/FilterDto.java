package net.folderit.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by gheng on 25/4/2017.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto implements Serializable {

    @JsonFormat(pattern="yyyy-MM-dd",timezone="America/Buenos_Aires")
    @DateTimeFormat(pattern = "yyyy-MM-dd",iso = DateTimeFormat.ISO.DATE_TIME)
    String fecha;
    CentroSalud centroSalud;
    Especialidad especialidad;
    Profesional profesional;
}
