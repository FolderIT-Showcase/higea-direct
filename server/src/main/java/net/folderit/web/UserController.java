package net.folderit.web;

import net.folderit.domain.Persona;
import net.folderit.domain.Roles;
import net.folderit.domain.User;
import net.folderit.domain.exception.TurneroException;
import net.folderit.domain.security.VerificationToken;
import net.folderit.repository.RoleRepository;
import net.folderit.service.PersonaService;
import net.folderit.service.UserService;
import net.folderit.util.OnRegistrationCompleteEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@RestController
@ComponentScan
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private static final Map<String, String> credentials = new HashMap<>();
    private final UserService userService;
    private final PersonaService personaService;
    private final RoleRepository roleRepository;
 ;
    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Autowired
    public UserController(UserService userService,PersonaService personaService,RoleRepository roleRepository) {
        this.userService = userService;
        this.personaService = personaService;
        this.roleRepository = roleRepository;
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

    @PostMapping("/users/registration")
    public ResponseEntity registerUserAccount(@RequestBody Persona persona, BindingResult result,
                                            WebRequest request,
                                            Errors errors) {

        if (result.hasErrors()) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        User registered = persona.getUserAsociado();
        if (registered == null) {
            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_MAIL_EXIST,new String[] { registered.getEmail() });

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }
        if(userService.findByEmail(registered.getEmail())!=null){

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_MAIL_EXIST,new String[] { registered.getEmail() });

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }
        //cambiar a user
        Roles role = roleRepository.findByAuthority(Roles.ROLE_ADMIN);
        List<Roles> roles = new ArrayList<>();
        roles.add(role);
        registered.setRoles(roles);

        try {
            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent
                    (registered, request.getLocale(), appUrl));
        } catch (Exception me) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_ERROR_GENERIC,null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }
        personaService.save(persona);
        return ResponseEntity.status(HttpStatus.OK).body(persona);
    }

    @RequestMapping(value = "/users/regitrationConfirm", method = RequestMethod.GET)
    public ResponseEntity confirmRegistration
            (WebRequest request, Model model, @RequestParam("token") String token) {

        VerificationToken verificationToken = userService.getVerificationToken(token);
        if (verificationToken == null) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_INVALID_TOKEN,null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {

            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_TOKEN_EXPIRED,null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(TurneroException.getInstance());

        }

        user.setEnabled(true);
        userService.saveRegisteredUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/users/external")
    public ResponseEntity<Long> finByTypeAndExternalId(@RequestParam String externalId,@RequestParam String type) {
        User mUser = userService.finByTypeAndExternalId(externalId,type);
        if(mUser!=null) ResponseEntity.ok(mUser.getId());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


}
