package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.dto.LoginRequest;
import com.spring.demo.backendplacementcell.dto.LoginResponse;
import com.spring.demo.backendplacementcell.entities.Profile;
import com.spring.demo.backendplacementcell.services.ProfileService;
import com.spring.demo.backendplacementcell.services.jwt.StudentServiceImpl;
import com.spring.demo.backendplacementcell.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
public class LoginController {

    private final AuthenticationManager authenticationManager;

    private final StudentServiceImpl studentService;

    private final JwtUtil jwtUtil;
    private final ProfileService profileService; // Add this


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, StudentServiceImpl studentService, JwtUtil jwtUtil, ProfileService profileService) {
        this.authenticationManager = authenticationManager;
        this.studentService = studentService;
        this.jwtUtil = jwtUtil;
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails userDetails;

        try{
            userDetails = studentService.loadUserByUsername(loginRequest.getEmail());
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        System.out.println("User roles: " + userDetails.getAuthorities());
        System.out.println("Requested role: " + loginRequest.getRole());

        // Check if the role matches
//        if (userDetails.getAuthorities().stream().noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equalsIgnoreCase(loginRequest.getRole()))) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponse("Role does not match"));
//        }
//
//
//        String jwt = jwtUtil.generateToken(userDetails.getUsername());

        String requestedRole = loginRequest.getRole();
        if (requestedRole == null || userDetails.getAuthorities().stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equalsIgnoreCase(requestedRole))) {
            System.out.println("Role does not match: " + requestedRole);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponse("Role does not match"));
        }

        // Generate JWT with email and role
//        String jwt = jwtUtil.generateToken(userDetails.getUsername(), requestedRole);


        Profile profile = profileService.getProfile(loginRequest.getEmail());
        String name = profile != null && profile.getFullName() != null ? profile.getFullName() : "Unknown";

        // Generate JWT with email, name, and role
        String jwt = jwtUtil.generateToken(loginRequest.getEmail(), name, requestedRole);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
