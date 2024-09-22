package com.perso.wodapp.model;

import jakarta.persistence.*;

@Entity
@Table(name="wods", schema="public")
public class Wod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private WodType type;

    private String description;

    // Constructeur par défaut
    public Wod() {
    }

    public Wod(Long id, String name, WodType type, String description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WodType getType() {
        return type;
    }

    public void setType(WodType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
