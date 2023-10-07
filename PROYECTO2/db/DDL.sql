DROP DATABASE IF EXISTS db_record_of_notes;
CREATE DATABASE db_record_of_notes;
USE db_record_of_notes;

CREATE TABLE Alumno (
    idAlumno INT NOT NULL AUTO_INCREMENT,
    carnet VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    year VARCHAR(5) NOT NULL,
    PRIMARY KEY (idAlumno)
);

CREATE TABLE Curso (
    idCurso INT NOT NULL AUTO_INCREMENT,
    abreviado VARCHAR(5) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCurso)
);

CREATE TABLE Semestre (
    idSemestre INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(5) NOT NULL,
    PRIMARY KEY (idSemestre)
);

CREATE TABLE Nota (
    idNota INT NOT NULL AUTO_INCREMENT,
    totalNota INT NOT NULL,
    alumnoID INT NOT NULL,
    cursoID INT NOT NULL,
    semestreID INT NOT NULL,
    PRIMARY KEY (idNota),
    FOREIGN KEY (alumnoID) REFERENCES Alumno(idAlumno),
    FOREIGN KEY (cursoID) REFERENCES Curso(idCurso),
    FOREIGN KEY (semestreID) REFERENCES Semestre(idSemestre)
);