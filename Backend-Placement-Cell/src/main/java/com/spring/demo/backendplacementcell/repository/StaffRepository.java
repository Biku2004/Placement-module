package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Student, Integer> {
    List<Student> findByRole(String role);
}