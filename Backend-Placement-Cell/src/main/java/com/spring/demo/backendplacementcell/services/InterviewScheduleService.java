//package com.spring.demo.backendplacementcell.services;
//
//import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
//import com.spring.demo.backendplacementcell.repository.InterviewScheduleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class InterviewScheduleService {
//
//    @Autowired
//    private InterviewScheduleRepository interviewScheduleRepository;
//
//    public List<InterviewSchedule> getAllInterviewSchedules() {
//        return interviewScheduleRepository.findAll();
//    }
//
//    public InterviewSchedule createInterviewSchedule(InterviewSchedule interviewSchedule) {
//        return interviewScheduleRepository.save(interviewSchedule);
//    }
//
//    public InterviewSchedule updateInterviewSchedule(Long id, InterviewSchedule interviewSchedule) {
//        InterviewSchedule existingSchedule = interviewScheduleRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Interview Schedule not found"));
//        existingSchedule.setCandidateName(interviewSchedule.getCandidateName());
//        existingSchedule.setInterviewerName(interviewSchedule.getInterviewerName());
//        existingSchedule.setInterviewDate(interviewSchedule.getInterviewDate());
//        existingSchedule.setInterviewTime(interviewSchedule.getInterviewTime());
//        existingSchedule.setStatus(interviewSchedule.getStatus());
//        return interviewScheduleRepository.save(existingSchedule);
//    }
//
//    public void deleteInterviewSchedule(Long id) {
//        interviewScheduleRepository.deleteById(id);
//    }
//}


package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
import com.spring.demo.backendplacementcell.repository.InterviewScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewScheduleService {
    @Autowired
    private InterviewScheduleRepository interviewScheduleRepository;

    public List<InterviewSchedule> getInterviewSchedulesForUser(String email, String role) {
        if ("Student".equals(role)) {
            return interviewScheduleRepository.findByCandidateName(email); // Students see their interviews
        } else if ("Recruiter".equals(role)) {
            return interviewScheduleRepository.findByInterviewerName(email); // Recruiters see interviews they conduct
        } else if ("Staff".equals(role)) {
            return interviewScheduleRepository.findAll(); // Staff see all interviews
        }
        return List.of(); // Default: empty list for invalid roles
    }

    public InterviewSchedule createInterviewSchedule(InterviewSchedule interviewSchedule, String email, String role) {
        if (!"Staff".equals(role) && !"Recruiter".equals(role)) {
            throw new RuntimeException("Only Staff or Recruiters can create interview schedules");
        }
        interviewSchedule.setCreatedBy(email); // Stamp creator’s email
        return interviewScheduleRepository.save(interviewSchedule);
    }

    public InterviewSchedule updateInterviewSchedule(Long id, InterviewSchedule interviewSchedule, String email, String role) {
        InterviewSchedule existing = interviewScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Schedule not found"));
        if ("Student".equals(role) || ("Recruiter".equals(role) && !existing.getInterviewerName().equals(email)) ||
                ("Staff".equals(role) && !existing.getCreatedBy().equals(email))) {
            throw new RuntimeException("You do not have permission to update this interview");
        }
        existing.setCandidateName(interviewSchedule.getCandidateName());
        existing.setInterviewerName(interviewSchedule.getInterviewerName());
        existing.setInterviewDate(interviewSchedule.getInterviewDate());
        existing.setInterviewTime(interviewSchedule.getInterviewTime());
        existing.setStatus(interviewSchedule.getStatus());
        existing.setCreatedBy(existing.getCreatedBy()); // Preserve original creator
        return interviewScheduleRepository.save(existing);
    }

    public void deleteInterviewSchedule(Long id, String email, String role) {
        InterviewSchedule existing = interviewScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Schedule not found"));
        if ("Student".equals(role) || ("Recruiter".equals(role) && !existing.getInterviewerName().equals(email)) ||
                ("Staff".equals(role) && !existing.getCreatedBy().equals(email))) {
            throw new RuntimeException("You do not have permission to delete this interview");
        }
        interviewScheduleRepository.deleteById(id);
    }
}