package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
//@Repository
//public interface TaskRepository extends JpaRepository<Task, Long> {
//}

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignee(String assignee);
}