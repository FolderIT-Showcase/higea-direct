package net.folderit.domain.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.io.Serializable;
import java.util.Locale;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class TurneroException implements Serializable {

    public static final String MESSAGE_MAIL_EXIST = "message.mail.exist";

    public static final String MESSAGE_ERROR_GENERIC = "message.error.create.user";

    public static final String MESSAGE_INVALID_TOKEN = "message.auth.invalidToken";

    public static final String MESSAGE_TOKEN_EXPIRED = "auth.message.expired";

    public static final String MESSAGE_TURNO_CANCELED = "message.turno.canceled";

    public static final String MESSAGE_PROFESIONALES_ASOCIADA  = "message.profesionales.asociada";

    public static final String MESSAGE_AFIP_INVALID  = "message.afip.invalid";

    public static final String MESSAGE_ESPECIALIDAD_ASOCIADA = "message.especialidad.asociada";

    public static final String MESSAGE_INVALID_DATE = "message.invalid.date";

    public static TurneroException instance;
    private String error;

    public static TurneroException getInstance() {
        if (instance == null) {
            instance = new TurneroException();
        }
        return instance;
    }

    //@Bean
    //@JsonIgnore
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames("i18/message");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    public void getMessage(String message, String[] arg) {
        try {
            this.setError(messageSource().getMessage(message, arg, new Locale("es_AR")));
        } catch (Exception exception) {
            throw exception;
        }

    }


}
