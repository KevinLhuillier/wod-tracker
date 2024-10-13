package com.perso.wodtracker.dto;

import java.util.List;

public class BlockDTO {
    private int order;
    private String format;
    private short timeLimit;
    private short rounds;
    private List<ExerciseDTO> exercises;

    // Getters and Setters

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public short getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(short timeLimit) {
        this.timeLimit = timeLimit;
    }

    public short getRounds() {
        return rounds;
    }

    public void setRounds(short rounds) {
        this.rounds = rounds;
    }

    public List<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }



}
