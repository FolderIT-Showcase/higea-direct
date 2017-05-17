package net.folderit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.stereotype.Controller;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@Controller
public class EspecialidadProfesionalFeignClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(EspecialidadProfesionalFeignClientApplication.class, args);
	}
}
