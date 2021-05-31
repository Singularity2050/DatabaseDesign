require('dotenv').config();

module.exports = {

    development: {
        username: "root",
        password: "",
        database: "stonyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
    production: {
        username: "root",
        password: "",
        database: "stonyflix",
        host: "localhost",
        dialect: "mysql",
        operatorsAliases:'false',
    },
};
