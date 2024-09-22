package com.perso.wodtracker.repository;

import com.perso.wodtracker.model.Wod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WodRepository extends JpaRepository<Wod, Long> {
}
