package net.folderit;

import net.folderit.service.SyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableAutoConfiguration
@ComponentScan
@SpringBootApplication
@Configuration
@EnableJpaRepositories
@EnableEurekaClient
@EnableCaching
@EnableScheduling
@RestController
public class TurneroWebApplication {

    private final SyncService syncService;

    @Autowired
    public TurneroWebApplication(SyncService syncService) {
        this.syncService = syncService;
    }

    public static void main(String[] args) {
        SpringApplication.run(TurneroWebApplication.class, args);
    }

    @GetMapping("/test/sync")
    public ResponseEntity<?> sync() {
        return ResponseEntity.ok(syncService.SyncObrasSociales());
    }

}
