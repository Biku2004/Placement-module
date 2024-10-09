package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.dto.SignUpRequest;
import com.spring.demo.backendplacementcell.dto.SignupResponse;
import com.spring.demo.backendplacementcell.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "${app.client.url}")
public class SignupController {

    private final AuthService authService;

    @Autowired
    public SignupController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping()
    public ResponseEntity<SignupResponse> signupStudent(@RequestBody SignUpRequest signUpRequest) {
            boolean isUserCreated = authService.signupStudent(signUpRequest);
//            Map<String, String> response = new HashMap<>();
            if (!isUserCreated) {
//                response.put("message", "User created");
                return ResponseEntity.status(HttpStatus.CREATED).body(new SignupResponse("User created successfully"));
                //return ResponseEntity.status(201).body(Map.of("message", "User created successfully"));

            } else {
//                response.put("message", "User not created");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SignupResponse("User not created "));
            }
    }
}
