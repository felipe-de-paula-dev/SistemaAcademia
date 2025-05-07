package com.example.hardft.repositories;

import com.example.hardft.entity.Exercicios.Exercicios;
import com.example.hardft.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciciosRepository extends JpaRepository<Exercicios, UUID> {
    List<Exercicios> findByNomeContainingIgnoreCase(String nome);
}
