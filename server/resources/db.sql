DROP TABLE IF EXISTS aluno;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS aula;

CREATE TABLE aluno(
    aluno_id INT GENERATED ALWAYS AS IDENTITY,
    aluno_nome VARCHAR(100) NOT NULL,
    aluno_idade INT NOT NULL,
    aluno_email VARCHAR(50) NOT NULL,
    aluno_telefone VARCHAR(15) NOT NULL,
    aluno_senha VARCHAR(64) NOT NULL,
    aluno_foto VARCHAR(255)
);

CREATE TABLE curso(
    curso_id INT GENERATED ALWAYS AS IDENTITY,
    curso_nome VARCHAR(255) NOT NULL,
    curso_tempo VARCHAR(30) NOT NULL,
    curso_descricao VARCHAR(500) NOT NULL,
    PRIMARY KEY(curso_id)
);

CREATE TABLE aula(
    aula_id SERIAL PRIMARY KEY,
    aula_nome VARCHAR(255) NOT NULL,
    aula_tempo VARCHAR(30) NOT NULL,
    aula_descricao VARCHAR(500) NOT NULL,
    fk_curso_id INT NOT NULL,
    FOREIGN KEY (fk_curso_id) REFERENCES curso(curso_id)
);
