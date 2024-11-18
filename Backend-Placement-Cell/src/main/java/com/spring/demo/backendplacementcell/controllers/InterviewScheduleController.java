package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
import com.spring.demo.backendplacementcell.services.InterviewScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:4200")
public class InterviewScheduleController {

    @Autowired
    private InterviewScheduleService interviewScheduleService;

    @GetMapping
    public List<InterviewSchedule> getAllInterviewSchedules() {
        return interviewScheduleService.getAllInterviewSchedules();
    }

    @PostMapping
    public InterviewSchedule createInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule) {
        return interviewScheduleService.createInterviewSchedule(interviewSchedule);
    }

    @PutMapping("/{id}")
    public InterviewSchedule updateInterviewSchedule(@PathVariable Long id, @RequestBody InterviewSchedule interviewSchedule) {
        return interviewScheduleService.updateInterviewSchedule(id, interviewSchedule);
    }

    @DeleteMapping("/{id}")
    public void deleteInterviewSchedule(@PathVariable Long id) {
        interviewScheduleService.deleteInterviewSchedule(id);
    }
}
