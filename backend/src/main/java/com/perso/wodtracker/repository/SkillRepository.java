package com.perso.wodtracker.repository;

import com.perso.wodtracker.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Skill findByName(String name);
}

