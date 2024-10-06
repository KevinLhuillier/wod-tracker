package com.perso.wodtracker.dto;


import java.time.LocalDate;
import java.util.List;

public class WodResponseDTO {
    private Long wodId;
    private String typeWod;
    private String formatWod;
    private String timeLimit;
    private String rounds;
    private LocalDate date;
    private List<ExerciseDTO> exercises;


    // Getters et Setters

    public Long getWodId() {
        return wodId;
    }

    public void setWodId(Long wodId) {
        this.wodId = wodId;
    }

    public String getTypeWod() {
        return typeWod;
    }

    public void setTypeWod(String typeWod) {
        this.typeWod = typeWod;
    }

    public String getFormatWod() {
        return formatWod;
    }

    public void setFormatWod(String formatWod) {
        this.formatWod = formatWod;
    }

    public String getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(String timeLimit) {
        this.timeLimit = timeLimit;
    }

    public String getRounds() {
        return rounds;
    }

    public void setRounds(String rounds) {
        this.rounds = rounds;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
}
