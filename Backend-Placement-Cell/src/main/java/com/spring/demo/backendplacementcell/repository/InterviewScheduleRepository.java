package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {
    List<InterviewSchedule> findByCandidateName(String candidateName); // For Students
    List<InterviewSchedule> findByInterviewerName(String interviewerName); // For Recruiters
}
