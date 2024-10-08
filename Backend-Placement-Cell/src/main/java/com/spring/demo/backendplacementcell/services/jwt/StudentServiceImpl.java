package com.spring.demo.backendplacementcell.services.jwt;

import com.spring.demo.backendplacementcell.entities.Student;
import com.spring.demo.backendplacementcell.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class StudentServiceImpl implements UserDetailsService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Student student = studentRepository.findByEmail(name)
                .orElseThrow(() -> new UsernameNotFoundException("Student with email " + name + " not found"));

        return new User(student.getEmail(), student.getPassword(), Collections.emptyList());
    }
}
