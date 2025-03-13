//package com.spring.demo.backendplacementcell.controllers;
//
//import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
//import com.spring.demo.backendplacementcell.services.InterviewScheduleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/interviews")
//@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
//public class InterviewScheduleController {
//
//    @Autowired
//    private InterviewScheduleService interviewScheduleService;
//
//    @GetMapping
//    public List<InterviewSchedule> getAllInterviewSchedules() {
//        return interviewScheduleService.getAllInterviewSchedules();
//    }
//
//    @PostMapping
//    public InterviewSchedule createInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule) {
//        return interviewScheduleService.createInterviewSchedule(interviewSchedule);
//    }
//
//    @PutMapping("/{id}")
//    public InterviewSchedule updateInterviewSchedule(@PathVariable Long id, @RequestBody InterviewSchedule interviewSchedule) {
//        return interviewScheduleService.updateInterviewSchedule(id, interviewSchedule);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteInterviewSchedule(@PathVariable Long id) {
//        interviewScheduleService.deleteInterviewSchedule(id);
//    }
//}


package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
import com.spring.demo.backendplacementcell.services.InterviewScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app"})
public class InterviewScheduleController {
    @Autowired
    private InterviewScheduleService interviewScheduleService;

    @GetMapping
    public List<InterviewSchedule> getMyInterviewSchedules(Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return interviewScheduleService.getInterviewSchedulesForUser(principal.getName(), role);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('Staff', 'Recruiter')") // Only Staff and Recruiters can create
    public InterviewSchedule createInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule,
                                                     Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return interviewScheduleService.createInterviewSchedule(interviewSchedule, principal.getName(), role);
    }

    @PutMapping("/{id}")
    public InterviewSchedule updateInterviewSchedule(@PathVariable Long id, @RequestBody InterviewSchedule interviewSchedule,
                                                     Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return interviewScheduleService.updateInterviewSchedule(id, interviewSchedule, principal.getName(), role);
    }

    @DeleteMapping("/{id}")
    public void deleteInterviewSchedule(@PathVariable Long id, Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        interviewScheduleService.deleteInterviewSchedule(id, principal.getName(), role);
    }
}