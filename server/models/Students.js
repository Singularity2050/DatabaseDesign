const Sequelize = require('sequelize');

module.exports = class Students extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            lecture_access: {
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
            modelName: 'Students',
            tableName: 'Students',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
