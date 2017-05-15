package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by luis on 13/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RowProfesionalDTO {

   private String persona_apellido;
   private String persona_documento_nro;
   private int profesional_id;
   private String profesional_clinica;
   private String persona_nombres;
   private int especialidad_id;
}
