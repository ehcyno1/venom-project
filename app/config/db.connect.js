const mysql = require('mysql');
const dbConfig = require('./db.config');

var db = mysql.createConnection( {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});
db.connect();
module.exports = db;
