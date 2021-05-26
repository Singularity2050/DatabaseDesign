const Sequelize = require('sequelize');

module.exports = class StuMajors extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            smid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            smname: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'StuMajors',
            tableName: 'StuMajors',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}