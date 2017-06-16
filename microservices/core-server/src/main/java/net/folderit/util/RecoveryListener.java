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
public class RecoveryListener implements
        ApplicationListener<OnRecoveryCompleteEvent> {

    private final UserService service;

    private final MessageSource messages;

    private final JavaMailSender mailSender;

    @Value("${message.recoverySucc}")
    private String mensajeSucces;

    @Value("${url.recoverySucc}")
    private String urlRegistration;

    @Autowired
    public RecoveryListener(UserService service, MessageSource messages, JavaMailSender mailSender) {
        this.service = service;
        this.messages = messages;
        this.mailSender = mailSender;
    }

    @Override
    public void onApplicationEvent(OnRecoveryCompleteEvent event) {
        this.recoveryRegistration(event);
    }

    @Transactional
    private void recoveryRegistration(OnRecoveryCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Restauración de Cuenta Higea Direct";
        String confirmationUrl
                = "/auth/recoveryUser?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setFrom("turnerofit@gmail.com");
        email.setSubject(subject);
        email.setText(mensajeSucces + " " + urlRegistration + confirmationUrl);
        mailSender.send(email);
    }
}
