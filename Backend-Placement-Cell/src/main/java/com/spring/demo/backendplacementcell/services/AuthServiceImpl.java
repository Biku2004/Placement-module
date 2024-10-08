package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.dto.SignUpRequest;
import com.spring.demo.backendplacementcell.entities.Student;
import com.spring.demo.backendplacementcell.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public boolean signupStudent(SignUpRequest signUpRequest) {
        // Check if Student Already Exists
        if (studentRepository.existsByEmail(signUpRequest.getEmail())) {
            return false;
        }

        Student student = new Student();
        BeanUtils.copyProperties(signUpRequest, student);
        /*
        The above line does 3 things :
        student.setName(signUpRequest.getName());
        student.setEmail(signUpRequest.getEmail());
        student.setPassword(signUpRequest.getPassword());
         */


        // Hash the password before Saving
        String hashPassword = passwordEncoder.encode(signUpRequest.getPassword());
        student.setPassword(hashPassword);
        studentRepository.save(student);
        return true;
    }
}
