package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {
}
