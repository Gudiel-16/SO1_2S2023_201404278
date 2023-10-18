const mysql = require('mysql2');

const { USER_DB, PASSWORD_DB, DATABASE_DB, HOST_DB } = process.env;

const params = {
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE_DB,
  host: HOST_DB,
  multipleStatements: true,
};

module.exports = mysql.createPool(params);