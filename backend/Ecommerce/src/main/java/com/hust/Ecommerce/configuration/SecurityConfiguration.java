package com.hust.Ecommerce.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

import com.hust.Ecommerce.security.JwtAuthenticationEntryPoint;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {
        @Value("${api.prefix}")
        private String apiPrefix;

        @Value("${domain.protocol}")
        private String domainProtocol;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(AbstractHttpConfigurer::disable) // Enable CORS
                                .authorizeHttpRequests(request -> request
                                                .requestMatchers(HttpMethod.GET,
                                                                String.format("%s/auth/registration/confirm/**",
                                                                                apiPrefix),

                                                                // sagger-ui
                                                                "/v2/api-docs",
                                                                "/v3/api-docs",
                                                                "/v3/api-docs/**",
                                                                "/swagger-resources/**",
                                                                "/swagger-ui.html",
                                                                "/webjars/**",
                                                                "/swagger-resources/configuration/ui",
                                                                "/swagger-resources/configuration/security",
                                                                "/swagger-ui.html/**",
                                                                "/swagger-ui/**",
                                                                "/swagger-ui.html/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.POST,
                                                                String.format("%s/auth/registration", apiPrefix),
                                                                String.format("%s/auth/login", apiPrefix),
                                                                String.format("%s/auth/refresh-token", apiPrefix),
                                                                String.format("%s/auth/forgot-password",
                                                                                apiPrefix))

                                                .permitAll()
                                                .requestMatchers(HttpMethod.PUT,
                                                                String.format("%s/auth/reset-password/**",
                                                                                apiPrefix))
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .exceptionHandling(
                                                exceptions -> exceptions
                                                                .authenticationEntryPoint(
                                                                                new BearerTokenAuthenticationEntryPoint())
                                                                .accessDeniedHandler(
                                                                                new BearerTokenAccessDeniedHandler()))
                                .oauth2ResourceServer(oauth2 -> oauth2
                                                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                                                .jwt());

                // http.securityMatcher(String.valueOf(EndpointRequest.toAnyEndpoint()));
                return http.build();
        }
}
