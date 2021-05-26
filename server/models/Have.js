const Sequelize = require('sequelize');

module.exports = class Have extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Lecture',
            tableName: 'Lectures',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
}