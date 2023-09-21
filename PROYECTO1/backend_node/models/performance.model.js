const { execute, execute2 } = require('../helpers/execute.helper');

const insertPerformance = (params, callback) => {

    const newData = [
        params.uso_cpu,
        params.uso_ram
    ];

    const query = `INSERT INTO Rendimiento(uso_cpu,uso_ram,fecha) VALUES(?,?,now());`;

    return execute(query, newData, callback);
};

const readPerformance = (callback) => {
    
    const query = `SELECT id, uso_cpu, uso_ram, DATE_FORMAT(fecha, "%Y-%m-%d") fecha FROM Rendimiento 
                    ORDER BY id DESC 
                    LIMIT 20;`;

    return execute2(query, callback);
};

module.exports = { insertPerformance, readPerformance };