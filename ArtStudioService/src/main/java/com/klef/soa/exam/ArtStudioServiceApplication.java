package com.klef.soa.exam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArtStudioServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtStudioServiceApplication.class, args);
		System.out.println("ArtStudioService is Running Successfully");
	}

}
