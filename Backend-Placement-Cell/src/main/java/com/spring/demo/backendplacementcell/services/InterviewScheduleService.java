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

    public List<InterviewSchedule> getAllInterviewSchedules() {
        return interviewScheduleRepository.findAll();
    }

    public InterviewSchedule createInterviewSchedule(InterviewSchedule interviewSchedule) {
        return interviewScheduleRepository.save(interviewSchedule);
    }

    public InterviewSchedule updateInterviewSchedule(Long id, InterviewSchedule interviewSchedule) {
        InterviewSchedule existingSchedule = interviewScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Schedule not found"));
        existingSchedule.setCandidateName(interviewSchedule.getCandidateName());
        existingSchedule.setInterviewerName(interviewSchedule.getInterviewerName());
        existingSchedule.setInterviewDate(interviewSchedule.getInterviewDate());
        existingSchedule.setInterviewTime(interviewSchedule.getInterviewTime());
        existingSchedule.setStatus(interviewSchedule.getStatus());
        return interviewScheduleRepository.save(existingSchedule);
    }

    public void deleteInterviewSchedule(Long id) {
        interviewScheduleRepository.deleteById(id);
    }
}
