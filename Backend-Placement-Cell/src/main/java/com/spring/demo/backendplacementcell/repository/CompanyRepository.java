// src/main/java/com/spring/demo/backendplacementcell/repositories/CompanyRepository.java
package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

}