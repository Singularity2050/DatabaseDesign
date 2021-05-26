const Sequelize = require('sequelize');

module.exports = class ProfMajors extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            pmid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: false
            },
            pmname: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ProfMajors',
            tableName: 'ProfMajors',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}