const Sequelize = require('sequelize');

module.exports = class Stu_Majors extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            mid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: false
            },
            mname: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Stu_Majors',
            tableName: 'Stu_Majors',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}