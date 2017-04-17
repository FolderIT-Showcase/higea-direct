package net.folderit

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
@Configuration
@EnableJpaRepositories
@EnableCaching
class AuthApplication

fun main(args: Array<String>) {
    System.setProperty("spring.devtools.restart.enabled", "true")
    SpringApplication.run(AuthApplication::class.java, *args)
}
