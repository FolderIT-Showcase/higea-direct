package net.folderit.service;

import net.folderit.domain.User;
import net.folderit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public User finByTypeAndExternalId( String externalId,  String type) {
        return userRepository.findByExternalIdAndType(externalId,type);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

}
