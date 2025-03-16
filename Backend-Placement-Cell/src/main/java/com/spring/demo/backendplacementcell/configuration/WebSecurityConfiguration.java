package com.spring.demo.backendplacementcell.configuration;

import com.spring.demo.backendplacementcell.filters.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfiguration {

    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public WebSecurityConfiguration(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        security
                .csrf(csrf -> csrf.disable())  // Disable CSRF since we're using JWT
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:4200","https://placement-cell-cutm.netlify.app"));  // Allowed CORS origin
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));  // Allow headers
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/signup", "/login").permitAll()  // Allow signup and login without auth
//                        .requestMatchers("/api/**").authenticated()  // Secure other API endpoints
//                        .requestMatchers("/api/companies/**").authenticated()  // Secure other API endpoints
////                        .requestMatchers("/jobs/approve/**", "/jobs/reject/**").hasAuthority("ROLE_STAFF")
//                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/signup", "/login").permitAll()
                        .requestMatchers("/api/staff/**").hasAuthority("Staff")
                        .requestMatchers("/api/companies/**").hasAnyAuthority("Recruiter", "Staff")
                        .requestMatchers("/api/companies").hasAnyAuthority("Recruiter", "Staff")
                        .requestMatchers("/api/tasks/**").hasAnyAuthority("Student", "Staff", "Recruiter")
                        .requestMatchers("/api/recruiter/**").hasAnyAuthority("Student", "Staff", "Recruiter")
                        .requestMatchers("/api/interviews/**").hasAnyAuthority("Student", "Staff", "Recruiter")
                        .requestMatchers(HttpMethod.GET, "/api/jobs/**").hasAnyAuthority("Student", "Staff", "Recruiter") // Students can only GET
                        .requestMatchers(HttpMethod.POST, "/api/jobs/*/apply").hasAuthority("Student") // Students can apply
                        .requestMatchers(HttpMethod.POST, "/api/jobs/*/send").hasAuthority("Staff") // Staff can send
                        .requestMatchers("/api/jobs/**").hasAnyAuthority("Recruiter", "Staff") // Other actions for Recruiters and Staff
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless sessions for JWT
                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter before auth

        return security.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:4200")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
}
