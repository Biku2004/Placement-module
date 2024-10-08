package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    boolean existsByEmail(String email);

    Optional<Student> findByEmail(String username);
}
