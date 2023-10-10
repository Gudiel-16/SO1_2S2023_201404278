USE db_record_of_notes;

/*DATOS QUE YA TIENEN QUE EXISTIR EN LAS TABLAS CORRESPONDIENTES*/

INSERT INTO Curso(abreviado, nombre) VALUES ('SO1','Sistemas Operativos 1'),
                                            ('BD1','Sistemas de Bases de Datos 1'),
                                            ('LFP','Lenguajes Formales y de Programacion'),
                                            ('SA','Software Avanzado'),
                                            ('AYD1','Analisis y Diseno 1');

INSERT INTO Semestre(nombre) VALUES ('1S'),('2S');

/*INSERTAR*/
DELIMITER //
CREATE PROCEDURE InsertarNota(
	in inCarnet VARCHAR(15),
    in inNombre VARCHAR(100),
    in inCurso VARCHAR(5),
    in inNota INT,
    in inSemestre VARCHAR(5),
    in inYear VARCHAR(5)
)
BEGIN
	INSERT IGNORE INTO Alumno(carnet, nombre, year) VALUES(inCarnet, inNombre, inYear);
	INSERT INTO Nota(totalNota, alumnoID, cursoID, semestreID) VALUES (
                                                    inNota,
                                                    (SELECT idAlumno FROM Alumno WHERE carnet = inCarnet),
                                                    (SELECT idCurso FROM Curso WHERE abreviado = inCurso),
                                                    (SELECT idSemestre FROM Semestre WHERE nombre = inSemestre)
                                                                      );
END //
DELIMITER ;

/*VER VALORES DE TABLAS*/
SELECT * FROM Curso;
SELECT * FROM Semestre;
SELECT * FROM Nota;
SELECT * FROM Alumno;

/*PRUEBAs*/
/*
INSERT IGNORE INTO Alumno(carnet, nombre, year) VALUES('201404278', 'Christopher', '2023');
CALL InsertarNota('201404278', 'Gudiel', 'SO1', 70, '2S', '2023');
*/