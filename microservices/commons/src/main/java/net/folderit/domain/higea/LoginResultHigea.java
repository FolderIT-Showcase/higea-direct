package net.folderit.domain.higea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResultHigea {
    private Boolean result;
    private String token;
    private String err;
}
