package com.perso.wodtracker.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

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

    @Column(name = "block_order", nullable = false)
    private Short blockOrder;

    @Column(name = "block_format", nullable = false)
    private String blockFormat;

    @Column(name = "block_time_cap", nullable = false)
    private Short blockTimeCap;

    @Column(name = "block_rounds", nullable = false)
    private Short blockRounds;

    @Column(name = "step_order", nullable = false)
    private Short stepOrder;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "amount", nullable = false)
    private Short amount;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "styles")
    private String styles;

    @Column(name = "tools")
    private String tools;

    @Column(name = "weight")
    private Float weight;

    public Integer getCompositionId() {
        return compositionId;
    }

    public Wod getWod() {
        return wod;
    }

    public void setWod(Wod wod) {
        this.wod = wod;
    }

    public Short getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Short stepOrder) {
        this.stepOrder = stepOrder;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Short getAmount() {
        return amount;
    }

    public void setAmount(Short amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public void setBlockOrder(short blockOrder) {
        this.blockOrder = blockOrder;
    }

    public short getBlockOrder() {
        return blockOrder;
    }

    public void setBlockFormat(String blockFormat) {
        this.blockFormat = blockFormat;
    }

    public String getBlockFormat() {
        return blockFormat;
    }

    public void setBlockTimeCap(short blockTimeCap) {
        this.blockTimeCap = blockTimeCap;
    }

    public short getBlockTimeCap() {
        return blockTimeCap;
    }

    public void setBlockRounds(short blockRounds) {
        this.blockRounds = blockRounds;
    }

    public short getBlockRounds() {
        return blockRounds;
    }

    public String getStyles() {
        return styles;
    }

    public void setStyles(String styles) {
        this.styles = styles;
    }

    public String getTools() {
        return tools;
    }

    public void setTools(String tools) {
        this.tools = tools;
    }

}

