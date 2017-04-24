package net.folderit.service;

import net.folderit.domain.User;
import net.folderit.domain.security.VerificationToken;
import net.folderit.repository.UserRepository;
import net.folderit.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private VerificationTokenRepository tokenRepository;

    @Autowired
    public UserService(UserRepository userRepository,VerificationTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
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


    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken);
    }

    public void saveRegisteredUser(User user) {
        userRepository.save(user);
    }

    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(null,token, user,null);
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
    public User finByTypeAndExternalId( String externalId,  String type) {
        return userRepository.findByExternalIdAndType(externalId,type);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

}
