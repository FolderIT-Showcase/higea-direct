package net.folderit;

import net.folderit.domain.Roles;
import net.folderit.domain.User;
import net.folderit.service.PersonaService;
import net.folderit.service.UserService;
import net.folderit.web.UserController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Role;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by gheng on 19/4/2017.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class PersonaTest {

    @Autowired
    private UserService userService;


    @Test
    public void saveUser(){

        User user = new User();
        user.setUsername("fernando");
        user.setPassword("berti");

        Roles rol  = new Roles();
        rol.setAuthority("ROLE_ADMIN");

        List<Roles> roles = new ArrayList<Roles>();
        roles.add(rol);
        user.setRoles(roles);

        userService.save(user);
    }
}
