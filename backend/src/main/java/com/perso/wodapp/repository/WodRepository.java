package com.perso.wodapp.repository;

import com.perso.wodapp.model.Wod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WodRepository extends JpaRepository<Wod, Long> {
}
