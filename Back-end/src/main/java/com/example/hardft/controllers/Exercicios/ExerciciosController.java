package com.example.hardft.controllers.Exercicios;

import com.example.hardft.entity.Exercicios.Exercicios;
import com.example.hardft.repositories.ExerciciosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercicios")
public class ExerciciosController {

    @Autowired
    private ExerciciosRepository exerciciosRepository;


    @GetMapping
    private List<Exercicios> getExercicios(){
        return this.exerciciosRepository.findAll();
    }


    @GetMapping("/{nome}")
    private List<Exercicios> gerExercicio(@PathVariable String nome){
        return this.exerciciosRepository.findByNomeContainingIgnoreCase(nome);
    }


    @PostMapping
    public ResponseEntity<String> postExercicios(@RequestBody Exercicios exercicio) {
        try {
            exerciciosRepository.save(exercicio);
            return ResponseEntity.ok("Exercício Salvo");
        } catch (Exception e) {
            // Logando o erro para depuração
            e.printStackTrace();

            // Retornando 400 para erros de validação ou 500 para erros internos
            return ResponseEntity.status(500).body("Erro ao salvar exercício: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    private ResponseEntity<String> deleteExercicios(@PathVariable UUID id){
        try{
            exerciciosRepository.deleteById(id);
            return ResponseEntity.ok("Exercicio deletado");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro! " + e);
        }
    }
}


