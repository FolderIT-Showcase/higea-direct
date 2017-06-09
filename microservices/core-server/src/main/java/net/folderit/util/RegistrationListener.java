package net.folderit.util;

import net.folderit.domain.core.User;
import net.folderit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.UUID;

@Component
public class RegistrationListener implements
        ApplicationListener<OnRegistrationCompleteEvent> {

    private final UserService service;

    private final MessageSource messages;

    private final JavaMailSender mailSender;

    @Value("${message.regSucc}")
    private String mensajeSucces;

    @Value("${url.regSucc}")
    private String urlRegistration;

    @Autowired
    public RegistrationListener(UserService service, MessageSource messages, JavaMailSender mailSender) {
        this.service = service;
        this.messages = messages;
        this.mailSender = mailSender;
    }

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    @Transactional
    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Confirmacion de Registro Higea Direct";
        String confirmationUrl
                = event.getAppUrl() + "/auth/regitrationConfirm?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setFrom("turnerofit@gmail.com");
        email.setSubject(subject);
        email.setText(mensajeSucces + " " + urlRegistration + confirmationUrl);
        mailSender.send(email);
    }
}
