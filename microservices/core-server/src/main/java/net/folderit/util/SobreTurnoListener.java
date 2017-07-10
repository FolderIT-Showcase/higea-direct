package net.folderit.util;

import net.folderit.domain.core.TurneroException;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Created by luis on 07/07/17.
 */
@Component
public class SobreTurnoListener implements ApplicationListener<OnSobreTurnoEvent> {


    private final MessageSource messages;

    private final JavaMailSender mailSender;

    @Autowired
    public SobreTurnoListener(MessageSource messages, JavaMailSender mailSender) {
        this.messages = messages;
        this.mailSender = mailSender;
    }

    @Override
    public void onApplicationEvent(OnSobreTurnoEvent event) {
        this.sendMail(event);
    }

    @Transactional
    private void sendMail(OnSobreTurnoEvent event) {

        String email = event.getEmail();
        String apellido = event.getApellido();
        String nombre = event.getNombre();
        String telefono = event.getTelefono();
        String fecha = event.getFecha();



       sendSecretariaMail(fecha,email,apellido,nombre,telefono);
       sendPacienteMail();
    }

    private void sendSecretariaMail(String fecha, String email,String apellido,String nombre,  String telefono ){

        String recipientAddress = email;
        String subject = "Solicitud de sobre turno";
        TurneroException.getInstance().getMessage(TurneroException.MESSAGE_SECRETARIA, new String[]{fecha,apellido,nombre,telefono,email});
        String mensaje = TurneroException.getInstance().getError();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(recipientAddress);
        simpleMailMessage.setFrom("turnerofit@gmail.com");
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(mensaje);

        mailSender.send(simpleMailMessage);
    }

    private void sendPacienteMail(){

        String recipientAddress = "lbonsembiante@folderit.net";
        String subject = "Solicitud de sobre turno";
        TurneroException.getInstance().getMessage(TurneroException.MESSAGE_PACIENTE,null);
        String mensaje = TurneroException.getInstance().getError();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(recipientAddress);
        simpleMailMessage.setFrom("turnerofit@gmail.com");
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(mensaje);

        mailSender.send(simpleMailMessage);
    }

    private String getFechaTurno(Date fecha) {

        String date;
        SimpleDateFormat sdfDate = new SimpleDateFormat("dd/MM/yyyy");
        Date now = new Date();
        String strDate = sdfDate.format(fecha);
        return strDate;

    }
}
