package com.hust.Migration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MigrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(MigrationApplication.class, args);
	}

	@Bean
	public MigrationCompletedListener migrationCompletedListener() {
		return new MigrationCompletedListener();
	}

}
