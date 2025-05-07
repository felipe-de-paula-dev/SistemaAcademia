package com.example.hardft.dto;
import com.example.hardft.entity.DiaTreino.DiaTreino;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TreinoUpdate {
    private UUID id;
    private String nome;
    private String cpfAluno;
    private LocalDate datavencimento;
    private List<DiaTreino> diaTreinos;
}