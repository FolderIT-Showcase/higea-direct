package net.folderit;

import net.folderit.domain.core.Roles;
import net.folderit.domain.core.User;
import net.folderit.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PersonaTest {

    @Autowired
    private UserService userService;

    @Test
    public void saveUser() {

        User user = new User();
        user.setUsername("fernando");
        user.setPassword("berti");

        Roles rol = new Roles();
        rol.setAuthority("ROLE_ADMIN");

        List<Roles> roles = new ArrayList<Roles>();
        roles.add(rol);
        user.setRoles(roles);

        userService.save(user);
    }
}
