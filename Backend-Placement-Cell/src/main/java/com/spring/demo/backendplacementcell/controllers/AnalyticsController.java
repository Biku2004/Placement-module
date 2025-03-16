package com.spring.demo.backendplacementcell.controllers;


import com.spring.demo.backendplacementcell.services.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter/analytics")
public class AnalyticsController {
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<String> getAnalytics(@RequestParam Long recruiterId) {
        return ResponseEntity.ok(analyticsService.getAnalytics(recruiterId));
    }
}