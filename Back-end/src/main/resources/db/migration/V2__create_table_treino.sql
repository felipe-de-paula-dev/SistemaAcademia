CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE treino (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    dataVencimento DATE NOT NULL,
    cpfAluno VARCHAR(11) NOT NULL,
    aluno_id UUID NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE
);
