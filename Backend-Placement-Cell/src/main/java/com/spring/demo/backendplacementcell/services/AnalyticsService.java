package com.spring.demo.backendplacementcell.services;

import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    public String getAnalytics(Long recruiterId) {
        // Placeholder for applicant numbers, shortlisting stats, etc.
        return "{ \"applicants\": 50, \"shortlisted\": 10 }";
    }
}