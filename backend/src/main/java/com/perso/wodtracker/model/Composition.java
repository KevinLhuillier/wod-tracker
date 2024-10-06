package com.perso.wodtracker.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "composition")
public class Composition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "composition_id")
    private Integer compositionId;

    @ManyToOne
    @JoinColumn(name = "wod_id", nullable = false)
    @JsonIgnore
    private Wod wod;

    @Column(name = "step_number", nullable = false)
    private Short stepNumber;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "reps", nullable = false)
    private Short reps;

    @Column(name = "weight")
    private Short weight;

    public Integer getCompositionId() {
        return compositionId;
    }

    public Wod getWod() {
        return wod;
    }

    public void setWod(Wod wod) {
        this.wod = wod;
    }

    public Short getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(Short stepNumber) {
        this.stepNumber = stepNumber;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Short getReps() {
        return reps;
    }

    public void setReps(Short reps) {
        this.reps = reps;
    }

    public Short getWeight() {
        return weight;
    }

    public void setWeight(Short weight) {
        this.weight = weight;
    }
// Getters and Setters
}

