package net.folderit.service;

import net.folderit.domain.User;
import net.folderit.domain.core.security.VerificationToken;
import net.folderit.repository.UserRepository;
import net.folderit.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private VerificationTokenRepository tokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, VerificationTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public List<User> findByLastName(String lastName) {
        return userRepository.findByLastName(lastName);
    }

    @Transactional
    public User save(User customer) {
        return userRepository.save(customer);
    }

    @Transactional
    public User update(User customer) {
        return userRepository.save(customer);
    }

    @Transactional
    public void delete(User customer) {
        userRepository.delete(customer);
    }

    @Transactional
    public User findByEmail(String email) {
        return userRepository.findByEmail(StringUtils.trimWhitespace(email));
    }


    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken);
    }

    public void saveRegisteredUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(null, token, user, null);
        myToken.calculateExpiryDate(myToken.EXPIRATION);
        tokenRepository.save(myToken);
    }

    private boolean emailExist(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }

    @Transactional
    public User finByTypeAndExternalId(String externalId, String type) {
        return userRepository.findByExternalIdAndType(externalId, type);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

}
