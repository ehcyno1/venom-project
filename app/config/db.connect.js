const mariadb = require('mariadb');
const dbConfig = require('./db.config');

var database = mariadb.createConnection( {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});
database.connect();
module.exports = database;
