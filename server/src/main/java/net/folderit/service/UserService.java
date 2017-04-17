package net.folderit.service;

import net.folderit.domain.User;
import net.folderit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findByLastName(String lastName) {
        return userRepository.findByLastName(lastName);
    }

    public User save(User customer) {
        return userRepository.save(customer);
    }

    public User update(User customer) {
        return userRepository.save(customer);
    }

    public void delete(User customer) {
        userRepository.delete(customer);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

}
