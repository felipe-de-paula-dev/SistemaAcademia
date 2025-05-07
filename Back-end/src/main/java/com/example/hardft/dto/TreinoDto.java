package com.example.hardft.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TreinoDto {
    private String nomeAluno;
    private String nomeTreino;
    private String cpfAluno;
    private Integer qtdeDias;
    private Integer qtdeExercicios;
}