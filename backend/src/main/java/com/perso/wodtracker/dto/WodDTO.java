package com.perso.wodtracker.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WodDTO {
    private String typeWod;
    private String formatWod;
    private short timeLimit;
    private short rounds;
    private List<ExerciseDTO> exercises;

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

