CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE dia_treino (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treino_id UUID,
        exercicios TEXT[],
    FOREIGN KEY (treino_id) REFERENCES treino(id) ON DELETE CASCADE
);