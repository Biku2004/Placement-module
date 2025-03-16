//package com.spring.demo.backendplacementcell.services;
//
//import com.spring.demo.backendplacementcell.entities.Interview;
//import com.spring.demo.backendplacementcell.entities.Recruiter;
//import com.spring.demo.backendplacementcell.repository.InterviewRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class InterviewService {
//    @Autowired
//    private InterviewRepository interviewRepository;
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public Interview scheduleInterview(Interview interview, Long recruiterId) {
//        interview.setRecruiter(new Recruiter() {{ setId(recruiterId); }});
//        Interview saved = interviewRepository.save(interview);
//        notifyPlacementCell(saved);
//        return saved;
//    }
//
//    private void notifyPlacementCell(Interview interview) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo("placementcell@college.com");
//        message.setSubject("Interview Scheduled");
//        message.setText("Interview: " + interview.getTitle() + " on " + interview.getDateTime());
//        mailSender.send(message);
//    }
//}