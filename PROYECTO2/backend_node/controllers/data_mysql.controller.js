const getData = require('../models/data_mysql.model');
const { response } = require('../helpers/response.helper');

const stored_data = (req, res) => {
    try {
        getData.storedData( (err, results) => {
            if (err) return response(res, 400, 'Error al obtener datos almacenados.', [err]);

            response(res, 200, 'Datos almacenados en MySQL obtenidos con éxito.', results[0]);
        });

    } catch (error) {
        return response(res, 400, 'Error al obtener datos almacenados.', [error]);
    }
};

const notes_course_per_semester = (req, res) => {
    try {
        getData.notesCoursePerSemester(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error al obtener notas de cursos por semestre (aprobados, reprobados).', [err]);
            
            response(res, 200, 'Notas de cursos por semestre (aprobados, reprobados) obtenidos con éxito.', results[0]);
        });

    } catch (error) {
        return response(res, 400, 'Error al obtener notas de cursos por semestre (aprobados, reprobados).', [error]);
    }
};

const courses_with_more_students_per_semester = (req, res) => {
    try {
        getData.coursesWithMoreStudentsPerSemester(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error al obtener cursos con mas estudiantes por semestre.', [err]);

            response(res, 200, 'Cursos con mas estudiantes por semestre obtenidos con éxito.', results[0]);
        });

    } catch (error) {
        return response(res, 400, 'Error al obtener cursos con mas estudiantes por semestre.', [error]);
    }
};

const students_with_the_best_average = (req, res) => {
    try {
        getData.studentsWithTheBestAverage(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error al obtener alumnos con mejor promedio.', [err]);

            response(res, 200, 'Alumnos con mejor promedio obtenidos con éxito.', results[0]);
        });

    } catch (error) {
        return response(res, 400, 'Error al obtener alumnos con mejor promedio.', [error]);
    }
};

module.exports = { stored_data, 
    notes_course_per_semester, 
    courses_with_more_students_per_semester, 
    students_with_the_best_average };