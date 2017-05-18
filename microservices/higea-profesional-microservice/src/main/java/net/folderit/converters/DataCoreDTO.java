package net.folderit.converters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.Profesional;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataCoreDTO {
    List<Profesional> data;
}
