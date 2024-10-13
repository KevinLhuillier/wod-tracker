package com.perso.wodtracker.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class WodDTO {
    private String typeWod;
    private short timeLimit;
    private short rounds;
    private LocalDate workoutDate;
    private List<BlockDTO> blocks;

    public String getTypeWod() {
        return typeWod;
    }

    public void setTypeWod(String typeWod) {
        this.typeWod = typeWod;
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

    public LocalDate getWorkoutDate() {
        return workoutDate;
    }

    public void setWorkoutDate(LocalDate date) {
        this.workoutDate = date;
    }

    public List<BlockDTO> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<BlockDTO> blocks) {
        this.blocks = blocks;
    }
}

