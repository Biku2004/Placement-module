package com.spring.demo.backendplacementcell.services;


import com.spring.demo.backendplacementcell.dto.SignUpRequest;

public interface AuthService {

    boolean signupStudent(SignUpRequest signUpRequest);

}
