package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by luis on 12/05/17.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResultDTO {

    private Boolean result;
    private String token;
    private String err;
}
