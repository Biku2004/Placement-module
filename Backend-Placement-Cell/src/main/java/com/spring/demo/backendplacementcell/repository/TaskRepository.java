package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}