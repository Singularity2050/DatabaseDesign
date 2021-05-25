require('dotenv').config();

module.exports = {

    development: {
        username: "root",
        password: "root",
        database: "sunyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
    production: {
        username: "root",
        password: "root",
        database: "sunyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
};
