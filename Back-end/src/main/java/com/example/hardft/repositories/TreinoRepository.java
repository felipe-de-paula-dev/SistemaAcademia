package com.example.hardft.repositories;

import com.example.hardft.entity.Aluno.Aluno;
import com.example.hardft.entity.Treino.Treino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TreinoRepository extends JpaRepository<Treino, UUID> {
    Treino findByCpfaluno(String cpf);
    List<Treino> findByAluno (Aluno aluno);
    long countByAlunoId(UUID alunoId);
}
