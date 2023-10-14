const mysqlConnection = require('../database/config');

const execute = (query, params, callback) => {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const execute2 = (query, callback) => {
    mysqlConnection.query(query, (err, res) => callback(err, res));
};

module.exports = { execute, execute2 };