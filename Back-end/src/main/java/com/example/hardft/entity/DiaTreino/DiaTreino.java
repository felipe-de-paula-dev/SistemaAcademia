package com.example.hardft.entity.DiaTreino;

import com.example.hardft.entity.Treino.Treino;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "dia_treino")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiaTreino {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "treino_id")
    private Treino treino;

    @Column(columnDefinition = "TEXT[]")
    private List<String> exercicios = new ArrayList<>();
}
