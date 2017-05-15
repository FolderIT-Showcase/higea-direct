package net.folderit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableAutoConfiguration
@ComponentScan
@SpringBootApplication
@Configuration
@EnableJpaRepositories
@EnableEurekaClient
@EnableCaching
public class TurneroWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(TurneroWebApplication.class, args);
    }
}
