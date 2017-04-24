package net.folderit.repository;

import net.folderit.domain.User;
import net.folderit.domain.security.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by gheng on 21/4/2017.
 */
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);
}
