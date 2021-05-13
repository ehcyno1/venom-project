module.exports = {
    host: "localhost",
    user: "root",
    password: "1234qwer",
    database: "venom",
    dialect: "mariadb",
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}