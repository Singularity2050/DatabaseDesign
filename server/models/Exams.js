
const Sequelize = require('sequelize');

module.exports = class Exams extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            eid:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ename:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Exams',
            tableName: 'Exams',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};