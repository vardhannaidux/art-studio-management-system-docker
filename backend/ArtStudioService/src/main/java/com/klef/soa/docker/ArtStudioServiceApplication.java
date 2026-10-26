package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArtStudioServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArtStudioServiceApplication.class, args);
        System.out.println("ArtStudioService is running successfully on package com.klef.soa.docker");
    }
}
