
const Sequelize = require('sequelize');

module.exports = class Assignments extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            aid:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            aname:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Assignments',
            tableName: 'Assignments',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};