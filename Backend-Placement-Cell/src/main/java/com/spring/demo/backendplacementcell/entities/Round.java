package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String status; // Pending, Opened, Completed, Failed
    private LocalDate date;

    public Round() {}

    public Round(String name, String status) {
        this.name = name;
        this.status = status;
    }

    public Round(String name, String status, LocalDate date) {
        this.name = name;
        this.status = status;
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Round(Long id, String name, String status, LocalDate date) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.date = date;
    }
}