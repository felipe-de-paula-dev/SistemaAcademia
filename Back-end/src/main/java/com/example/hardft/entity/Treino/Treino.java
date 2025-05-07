    package com.example.hardft.entity.Treino;

    import com.example.hardft.entity.Aluno.Aluno;
    import com.example.hardft.entity.DiaTreino.DiaTreino;
    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDate;
    import java.util.Date;
    import java.util.List;
    import java.util.UUID;

    @Entity
    @Table(name = "treino")
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Treino {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        private String nome;

        private LocalDate datavencimento;

        private String cpfaluno;

        @ManyToOne
        @JoinColumn(name = "aluno_id")
        @JsonBackReference
        private Aluno aluno;

        @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL)
        @OrderColumn(name = "ordem")
        @JsonManagedReference
        private List<DiaTreino> diaTreinos;
    }
