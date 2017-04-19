package net.folderit.web;

import net.folderit.domain.User;
import net.folderit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private static final Map<String, String> credentials = new HashMap<>();
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<Collection<User>> getAll() {
        return new ResponseEntity<>((Collection<User>) userService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<Long> createUser(@RequestBody User user) {
        User mUser = userService.save(user);
        return ResponseEntity.ok(mUser.getId());
    }


/*    @RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody User customer) {
        return new ResponseEntity<>(userService.save(customer), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<?> isLoggedIn(HttpServletResponse httpServletResponse, @RequestBody AccountCredentials user) {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/user")
    public Map<String, String> user(@RequestBody Principal principal) {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", principal.getName());
        return map;
    }
*/
}
