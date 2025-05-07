CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE exercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    urlVideo TEXT NOT NULL UNIQUE
);