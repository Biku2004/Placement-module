package com.spring.demo.backendplacementcell.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CommunicationService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendMessageToPlacementCell(String recruiterEmail, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("placementcell@college.com");
        mail.setFrom(recruiterEmail);
        mail.setSubject("Message from Recruiter");
        mail.setText(message);
        mailSender.send(mail);
    }
}