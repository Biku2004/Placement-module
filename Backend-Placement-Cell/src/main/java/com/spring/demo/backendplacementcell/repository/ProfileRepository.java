package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByEmail(String email); // Fetch profile by user’s email
}