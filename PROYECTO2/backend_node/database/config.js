const mysql = require('mysql2');

const { USER_MYSQL, PASS_MYSQL, NAMEDB_MYSQL, HOST_MYSQL } = process.env;

const params = {
  user: USER_MYSQL,
  password: PASS_MYSQL,
  database: NAMEDB_MYSQL,
  host: HOST_MYSQL,
  multipleStatements: true,
};

module.exports = mysql.createPool(params);