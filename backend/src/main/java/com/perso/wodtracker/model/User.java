package com.perso.wodtracker.model;

import jakarta.persistence.*;

@Entity
@Table(name="USERS", schema="public")
public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    private String name;
    private String email;

}

