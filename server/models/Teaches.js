const Sequelize = require('sequelize');

module.exports = class Teaches extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            semester: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Teaches',
            tableName: 'Teaches',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}