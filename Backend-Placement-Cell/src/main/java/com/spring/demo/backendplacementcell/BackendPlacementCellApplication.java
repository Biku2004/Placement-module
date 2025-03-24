package com.spring.demo.backendplacementcell;

//import com.spring.demo.backendplacementcell.services.EmailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@EnableScheduling
public class BackendPlacementCellApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendPlacementCellApplication.class, args);
    }


}
