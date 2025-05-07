package com.example.hardft.repositories;

import com.example.hardft.entity.DiaTreino.DiaTreino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiaTreinoRepository extends JpaRepository<DiaTreino, UUID> {
}
