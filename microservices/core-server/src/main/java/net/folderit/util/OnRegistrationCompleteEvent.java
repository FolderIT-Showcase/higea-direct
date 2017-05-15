package net.folderit.util;

import lombok.Data;
import net.folderit.domain.User;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

@Data
public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private Locale locale;
    private User user;

    public OnRegistrationCompleteEvent(
            User user, Locale locale, String appUrl) {
        super(user);

        this.user = user;
        this.locale = locale;
        this.appUrl = appUrl;
    }
}
