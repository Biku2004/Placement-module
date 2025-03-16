package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Recruiter;
import com.spring.demo.backendplacementcell.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RecruiterService {
    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Recruiter registerRecruiter(Recruiter recruiter) {
        recruiter.setPassword(passwordEncoder.encode(recruiter.getPassword()));
        recruiter.setEmailVerified(false);
        Recruiter savedRecruiter = recruiterRepository.save(recruiter);

        // Send verification email
        sendVerificationEmail(savedRecruiter.getEmail());
        return savedRecruiter;
    }

    private void sendVerificationEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verify Your Email");
        message.setText("Click this link to verify: http://localhost:8080/api/recruiter/verify?email=" + email);
        mailSender.send(message);
    }

    public void verifyEmail(String email) {
        Recruiter recruiter = recruiterRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setEmailVerified(true);
        recruiterRepository.save(recruiter);
    }
}