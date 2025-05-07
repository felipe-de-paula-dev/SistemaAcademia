package com.example.hardft.controllers.Treino;

import com.example.hardft.dto.TreinoDto;
import com.example.hardft.dto.TreinoDtoAluno;
import com.example.hardft.dto.TreinoUpdate;
import com.example.hardft.entity.Treino.Treino;
import com.example.hardft.repositories.TreinoRepository;
import com.example.hardft.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/treino")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @Autowired
    private TreinoRepository treinoRepository;

    @PostMapping
    private ResponseEntity<String> criarTreino(@RequestBody TreinoDto treinoDto){
        try {
            return treinoService.CriarTreino(treinoDto);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao criar treino " + e);
        }
    }

    @PostMapping("/cpf")
    private ResponseEntity<String> criarTreinoCpf(@RequestBody TreinoDtoAluno treinoDto){
        try {
            return treinoService.CriarTreinoAluno(treinoDto);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao criar treino " + e);
        }
    }

    @PutMapping
    private ResponseEntity<String> atualizarTreino(@RequestBody TreinoUpdate treino){
        try {
            treinoService.atualizarTreino(treino);
            return ResponseEntity.ok("Treino atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao atualizar treino " + e);
        }
    }

    @GetMapping("/liberar/{cpf}")
    public ResponseEntity<Treino> liberarTreinoPorCpf(@PathVariable String cpf) {
        Treino treino = treinoRepository.findByCpfaluno(cpf);
        if (treino == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(treino);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<String> deletarTreino(@PathVariable UUID id){
        try {
            treinoService.deletarTreino(id);
            return ResponseEntity.ok("Treino deletado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao deletar treino " + e);
        }
    }

}
