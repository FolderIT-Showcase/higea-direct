package net.folderit.domain.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.io.Serializable;
import java.util.Locale;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * Created by gheng on 24/4/2017.
 */

 @Data
 @Configuration
 @AllArgsConstructor
 @NoArgsConstructor
 @JsonInclude(NON_NULL)
public class TurneroException implements Serializable {

    public static final String MESSAGE_MAIL_EXIST  = "message.mail.exist";

    private String error;

    @Bean
    @JsonIgnore
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames("i18//message");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

   public void getMessage(String message,String[] arg){
        try {
            this.setError(messageSource().getMessage(message,arg, new Locale("de")));
        }catch (Exception exception){
            throw  exception;
        }

    }



}
