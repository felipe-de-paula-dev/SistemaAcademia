package com.example.hardft.services;

import com.example.hardft.dto.TreinoDto;
import com.example.hardft.dto.TreinoDtoAluno;
import com.example.hardft.dto.TreinoUpdate;
import com.example.hardft.entity.Aluno.Aluno;
import com.example.hardft.entity.DiaTreino.DiaTreino;
import com.example.hardft.entity.Treino.Treino;
import com.example.hardft.repositories.AlunoRepository;
import com.example.hardft.repositories.DiaTreinoRepository;
import com.example.hardft.repositories.TreinoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TreinoService {

    @Autowired
    public AlunoRepository alunoRepository;

    @Autowired
    public TreinoRepository treinoRepository;

    @Autowired
    public DiaTreinoRepository diaTreinoRepository;

    public ResponseEntity<String> CriarTreino(TreinoDto treino){
        try{

            Aluno aluno = new Aluno();

            Aluno alunoExiste = alunoRepository.findFirstByNomeContainingIgnoreCase(treino.getNomeAluno());

            if(alunoExiste == null){
                aluno.setNome(treino.getNomeAluno());
                alunoRepository.save(aluno);
            } else{
                aluno = alunoRepository.findFirstByNomeContainingIgnoreCase(treino.getNomeAluno());
            }


            //

            LocalDate hoje = LocalDate.now();

            LocalDate vencimentoPadrao = hoje.plusMonths(3);

            Treino newTreino = new Treino();
            newTreino.setNome(treino.getNomeTreino());
            newTreino.setDatavencimento(vencimentoPadrao);
            newTreino.setCpfaluno(treino.getCpfAluno());
            newTreino.setAluno(aluno);

            List<DiaTreino> treinos = new ArrayList<>();

            newTreino.setDiaTreinos(treinos);

            treinoRepository.save(newTreino);

            for (int i = 1; i <= treino.getQtdeDias() ; i++) {
                DiaTreino newDia = new DiaTreino();

                newDia.setTreino(newTreino);

                List<String> exercicios = new ArrayList<>();

                for (int j = 1; j <= treino.getQtdeExercicios(); j++) {
                    exercicios.add("");
                }

                newDia.setExercicios(exercicios);

                treinos.add(newDia);

                diaTreinoRepository.save(newDia);
            }
            return ResponseEntity.ok("Treino Criado Com Sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao criar treino " + e);
        }

    }

    public ResponseEntity<String> CriarTreinoAluno(TreinoDtoAluno treino){
        try{

            Aluno aluno = alunoRepository.findById(treino.getAlunoId()) .orElseThrow(() -> new RuntimeException("Aluno não " +
                    "encontrado"));

            List<Treino> treinosAluno = treinoRepository.findByAluno(aluno);
            if (treinosAluno.isEmpty()) {
                throw new RuntimeException("Nenhum treino encontrado para o aluno");
            }

            Treino treinoPorIDAluno = treinosAluno.get(0);

            System.out.println(treinoPorIDAluno.getCpfaluno());

            //

            LocalDate hoje = LocalDate.now();

            LocalDate vencimentoPadrao = hoje.plusMonths(3);

            Treino newTreino = new Treino();
            newTreino.setNome(treino.getNomeTreino());
            newTreino.setDatavencimento(vencimentoPadrao);
            newTreino.setCpfaluno(treinoPorIDAluno.getCpfaluno());
            newTreino.setAluno(aluno);

            List<DiaTreino> treinos = new ArrayList<>();

            newTreino.setDiaTreinos(treinos);

            treinoRepository.save(newTreino);

            for (int i = 1; i <= treino.getQtdeDias() ; i++) {
                DiaTreino newDia = new DiaTreino();

                newDia.setTreino(newTreino);

                List<String> exercicios = new ArrayList<>();

                for (int j = 1; j <= treino.getQtdeExercicios(); j++) {
                    exercicios.add("");
                }

                newDia.setExercicios(exercicios);

                treinos.add(newDia);

                diaTreinoRepository.save(newDia);
            }
            return ResponseEntity.ok("Treino Criado Com Sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao criar treino " + e);
        }

    }


    @Transactional
    public ResponseEntity<String> atualizarTreino(TreinoUpdate treino){
        try{

            Treino treinosExiste = treinoRepository.findById(treino.getId()).orElse(null);

            LocalDate hoje = LocalDate.now();

            LocalDate vencimentoPadrao = hoje.plusMonths(3);

            treinosExiste.setNome(treino.getNome());
            treinosExiste.setDatavencimento(vencimentoPadrao);
            treinosExiste.setDiaTreinos(new ArrayList<>());
            treinoRepository.save(treinosExiste);

            for (DiaTreino diaTreino : treino.getDiaTreinos()) {
                diaTreino.setTreino(treinosExiste);
                diaTreinoRepository.save(diaTreino);
            }

            return ResponseEntity.ok("Treino Atualizado Com Sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erro ao atualizar treino " + e);
        }
    }

    @Transactional
    public void deletarTreino(UUID treinoId) {
        Treino treino = treinoRepository.findById(treinoId)
                .orElseThrow(() -> new EntityNotFoundException("Treino não encontrado"));

        Aluno aluno = treino.getAluno();
        UUID alunoId = aluno.getId();

        long totalTreinos = treinoRepository.countByAlunoId(alunoId);

        treinoRepository.delete(treino);

        if (totalTreinos == 1) {
            alunoRepository.deleteById(alunoId);
        }
    }
}
