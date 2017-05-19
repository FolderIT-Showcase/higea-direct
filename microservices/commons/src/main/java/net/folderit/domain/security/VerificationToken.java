package net.folderit.domain.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.User;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VerificationToken {
    public static final int EXPIRATION = 60 * 24;
    private Long id;
    private String token;
    private User user;
    private Date expiryDate;
}
