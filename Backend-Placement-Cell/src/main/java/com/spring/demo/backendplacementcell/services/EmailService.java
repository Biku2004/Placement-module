package com.spring.demo.backendplacementcell.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;


    public void sendExamLink(String to, String examLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("demoplacementcell@gmail.com");
            message.setTo(to);
            message.setSubject("Exam Link for Job Application");
            message.setText("Dear Student,\n\nYour exam link is: " + examLink + "\n\nBest regards,\nPlacement Cell");
            mailSender.send(message);
            logger.info("Email sent successfully to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw e; // Re-throw to ensure the caller knows it failed
        }
    }
}