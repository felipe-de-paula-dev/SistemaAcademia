package com.example.hardft.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TreinoDtoAluno {
    private UUID alunoId;
    private String nomeTreino;
    private Integer qtdeDias;
    private Integer qtdeExercicios;
}