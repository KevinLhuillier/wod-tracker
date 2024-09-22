package com.perso.wodapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="USERS", schema="public")
public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    private String name;
    private String email;

}

