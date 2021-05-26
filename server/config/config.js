require('dotenv').config();

module.exports = {

    development: {
        username: "root",
        password: "",
        database: "sunyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
    production: {
        username: "root",
        password: "",
        database: "sunyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
};
