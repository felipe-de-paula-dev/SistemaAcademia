package com.example.hardft.controllers.Treino;

import com.example.hardft.entity.Aluno.Aluno;
import com.example.hardft.repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    private ResponseEntity<?> buscarTreinos(){
        try {
            List<Aluno> alunos = alunoRepository.findAll();
            return ResponseEntity.ok(alunos);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao buscar alunos " + e);
        }
    }

    @GetMapping("buscar")
    private ResponseEntity<?> buscarTreinosNome(@RequestParam String nome){
        try {
            List<Aluno> alunos = alunoRepository.findByNomeContainingIgnoreCase(nome);
            return ResponseEntity.ok(alunos);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao buscar alunos " + e);
        }
    }

}
