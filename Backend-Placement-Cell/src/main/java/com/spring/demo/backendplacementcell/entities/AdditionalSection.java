package com.spring.demo.backendplacementcell.entities;

// AdditionalSection.java
import jakarta.persistence.Embeddable;

@Embeddable
public class AdditionalSection {
    private String label;
    private String value;

    // Getters and setters
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}