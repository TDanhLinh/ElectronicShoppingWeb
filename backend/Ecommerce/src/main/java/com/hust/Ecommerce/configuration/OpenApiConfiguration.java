package com.hust.Ecommerce.configuration;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(info = @Info(contact = @Contact(

), description = "Open Api documentation for Electronic Shopping Web", title = "Open Api Electronic Shopping Web (E-Ecommerce)", version = "0.0.1-SNAPSHOT", license = @License(name = "Apache License Version 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"), termsOfService = "Term of service"), servers = {
                @Server(description = "Local Environment", url = "http://localhost:8080")

}, security = {
                @SecurityRequirement(name = "BearerAuth")
})
@SecurityScheme(name = "BearerAuth", description = "JWT auth description", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)

@Configuration
public class OpenApiConfiguration {

}
