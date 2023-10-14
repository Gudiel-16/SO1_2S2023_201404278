const { execute, execute2 } = require('../helpers/execute.helper');

const storedData = (callback) => {

    const query = `CALL DatosAlmacenados();`;

    return execute2(query, callback);
};

const notesCoursePerSemester = (params, callback) => {
    
    const data = [
        params.curso,
        params.semestre
    ];

    const query = `CALL NotaCursoPorSemestre(?,?);`;

    return execute(query, data, callback);
};

const coursesWithMoreStudentsPerSemester = (params, callback) => {
    
    const data = [
        params.semestre
    ];

    const query = `CALL CursosAlumnosPorSemestre(?);`;

    return execute(query, data, callback);
};

const studentsWithTheBestAverage = (callback) => {

    const query = `CALL AlumnosMejorPromedio();`;

    return execute2(query, callback);
};

module.exports = { storedData, notesCoursePerSemester, coursesWithMoreStudentsPerSemester, studentsWithTheBestAverage };