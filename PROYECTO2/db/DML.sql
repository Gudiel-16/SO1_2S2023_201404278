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

/*DATOS ALMACENADOS*/
DELIMITER //
CREATE PROCEDURE DatosAlmacenados()
BEGIN
	SELECT A.carnet as "carnet",
           A.nombre as "nombre_alumno",
           C.abreviado as "nombre_curso_abreviado",
           C.nombre as "nombre_curso",
           N.totalNota as "nota",
           S.nombre as "semestre",
           A.year as "year"
    FROM Alumno A
    JOIN Nota N on A.idAlumno = N.alumnoID
    JOIN Curso C on N.cursoID = C.idCurso
    JOIN Semestre S on N.semestreID = S.idSemestre
    ORDER BY N.idNota DESC
    LIMIT 25;
END //
DELIMITER ;

/*NOTAS DE UN CURSO EN UN SEMESTRE (APROBADOS, REPROBADOS)*/
DELIMITER //
CREATE PROCEDURE NotaCursoPorSemestre(
    in inCurso VARCHAR(5),
    in inSemestre VARCHAR(5)
)
BEGIN
    SELECT COUNT(N.totalNota) as "aprob_reprob" FROM Alumno A
    JOIN Nota N on A.idAlumno = N.alumnoID AND N.totalNota > 60
    JOIN Curso C on N.cursoID = C.idCurso AND C.abreviado = inCurso
    JOIN Semestre S on N.semestreID = S.idSemestre AND S.nombre = inSemestre
    UNION ALL
    SELECT COUNT(N.totalNota) as "aprob_reprob" FROM Alumno A
    JOIN Nota N on A.idAlumno = N.alumnoID AND N.totalNota <= 60
    JOIN Curso C on N.cursoID = C.idCurso AND C.abreviado = inCurso
    JOIN Semestre S on N.semestreID = S.idSemestre AND S.nombre = inSemestre;
END //
DELIMITER ;

/*CURSOS CON MAYOR NUMERO DE ALUMNOS EN UN SEMESTRE ESPECIFICO*/
DELIMITER //
CREATE PROCEDURE CursosAlumnosPorSemestre(
    in inSemestre VARCHAR(5)
)
BEGIN
    SELECT C.nombre as "nombre_curso",
           C.abreviado as "nombre_curso_abreviado",
           COUNT(C.abreviado) as "cantidad"
    FROM Alumno A
    JOIN Nota N on A.idAlumno = N.alumnoID
    JOIN Curso C on N.cursoID = C.idCurso
    JOIN Semestre S on N.semestreID = S.idSemestre AND S.nombre = inSemestre
    GROUP BY C.nombre, C.abreviado
    ORDER BY cantidad DESC
    LIMIT 3;
END //
DELIMITER ;

/*ALUMNOS CON MEJOR PROMEDIO*/
DELIMITER //
CREATE PROCEDURE AlumnosMejorPromedio(
    in inSemestre VARCHAR(5)
)
BEGIN
    SELECT A.carnet as "carnet",
           A.nombre as "nombre",
           AVG(N.totalNota) as "promedio"
    FROM Alumno A
    JOIN Nota N on A.idAlumno = N.alumnoID
    JOIN Curso C on N.cursoID = C.idCurso
    JOIN Semestre S on N.semestreID = S.idSemestre AND S.nombre = inSemestre
    GROUP BY A.carnet, A.nombre
    ORDER BY promedio DESC
    LIMIT 5;
END //
DELIMITER ;

/*VER VALORES DE TABLAS*/
/*SELECT * FROM Curso;
SELECT * FROM Semestre;
SELECT * FROM Nota;
SELECT * FROM Alumno;*/

/*PRUEBAs*/
/*
INSERT IGNORE INTO Alumno(carnet, nombre, year) VALUES('201404278', 'Christopher', '2023');
CALL InsertarNota('201404278', 'Gudiel', 'SO1', 70, '2S', '2023');
CALL DatosAlmacenados();
CALL NotaCursoPorSemestre('SO1', '1S');
CALL CursosAlumnosPorSemestre('1S');
CALL AlumnosMejorPromedio();
*/