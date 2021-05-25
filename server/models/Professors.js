const Sequelize = require('sequelize');

module.exports = class Professors extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            upload_permission: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                unique: false
            },
            mid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: false
            },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Professors',
            tableName: 'Professors',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
