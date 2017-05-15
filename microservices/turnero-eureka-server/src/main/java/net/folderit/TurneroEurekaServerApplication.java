package net.folderit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Created by luis on 12/05/17.
 */
@SpringBootApplication
@EnableEurekaServer
public class TurneroEurekaServerApplication {


           public static void main(String[] args) {
            SpringApplication.run(TurneroEurekaServerApplication.class, args);
        }


}
