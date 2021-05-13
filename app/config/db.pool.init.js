const mariadb = require('mariadb');
const config = require('./db.pool.config.json');

const connectionPool = mariadb.createPool(config);

module.exports = connectionPool;
