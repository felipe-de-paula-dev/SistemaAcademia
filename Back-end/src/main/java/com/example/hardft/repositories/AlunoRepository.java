package com.example.hardft.repositories;

import com.example.hardft.entity.Aluno.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {
    List<Aluno> findByNomeContainingIgnoreCase(String nome);
    Aluno findFirstByNomeContainingIgnoreCase(String nome);
}
