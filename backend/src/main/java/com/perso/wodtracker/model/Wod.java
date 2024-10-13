package com.perso.wodtracker.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="wods", schema="public")
public class Wod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wod_id")
    private Long wodId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "time_cap", nullable = false)
    private Short timeCap;

    @Column(name = "rounds", nullable = false)
    private Short rounds;

    @Column(name = "workout_date")
    private LocalDate date;

    @OneToMany(mappedBy = "wod", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Composition> compositions;

    // Constructeur par défaut
    public Wod() {
    }

    public Long getId() {
        return wodId;
    }

    public void setId(Long id) {
        this.wodId = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getWodId() {
        return wodId;
    }

    public void setWodId(Long wodId) {
        this.wodId = wodId;
    }

    public List<Composition> getCompositions() {
        return compositions;
    }

    public void setCompositions(List<Composition> compositions) {
        this.compositions = compositions;
    }

    public Short getRounds() {
        return rounds;
    }

    public void setRounds(Short rounds) {
        this.rounds = rounds;
    }

    public Short getTimeCap() {
        return timeCap;
    }

    public void setTimeCap(Short timeCap) {
        this.timeCap = timeCap;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
