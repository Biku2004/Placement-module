package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobApplicationStats;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import com.spring.demo.backendplacementcell.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

//    @Autowired
//    private JobPostingRepository jobPostingRepository;


    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public JobApplicationStats getJobApplicationStats() {
        List<JobApplication> applications = jobApplicationRepository.findAll();
        int totalApplications = applications.size();
        long interviewsAttended = applications.stream()
                .filter(app -> app.getRounds().stream()
                        .anyMatch(r -> "Interview".equals(r.getName()) &&
                                ("Completed".equals(r.getStatus()) || "Opened".equals(r.getStatus()))))
                .count();
        int interviewPercentage = totalApplications > 0 ? (int) ((interviewsAttended * 100) / totalApplications) : 0;
        long offersReceived = applications.stream()
                .filter(app -> "Offer Received".equals(app.getStatus()))
                .count();
        long rejectedOffers = applications.stream()
                .filter(app -> app.getRounds().stream()
                        .anyMatch(r -> "Offer".equals(r.getName()) && "Failed".equals(r.getStatus())))
                .count();
        System.out.println("Returning stats: totalApplications=" + totalApplications +
                ", interviewsAttended=" + interviewsAttended +
                ", interviewPercentage=" + interviewPercentage +
                ", offersReceived=" + offersReceived +
                ", rejectedOffers=" + rejectedOffers); // Debug log
        return new JobApplicationStats(totalApplications, interviewsAttended, interviewPercentage, offersReceived, rejectedOffers);
    }




}