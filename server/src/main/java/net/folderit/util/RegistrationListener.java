package net.folderit.util;

import net.folderit.domain.User;
import net.folderit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Created by gheng on 21/4/2017.
 */
@Component
public class RegistrationListener implements
        ApplicationListener<OnRegistrationCompleteEvent> {

    @Autowired
    private UserService service;

    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${message.regSucc}")
    private String mensajeSucces;

    @Value("${url.regSucc}")
    private String urlRegistration;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Confirmacion de Registro Turnero Folder IT";
        String confirmationUrl
                = event.getAppUrl() + "/regitrationConfirm?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setFrom("turnerofit@gmail.com");
        email.setSubject(subject);
        email.setText(mensajeSucces + " " + urlRegistration + confirmationUrl);
        mailSender.send(email);
    }
}
