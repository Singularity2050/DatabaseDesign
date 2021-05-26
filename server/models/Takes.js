const Sequelize = require('sequelize');

module.exports = class Takes extends Sequelize.Model {
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
            modelName: 'Takes',
            tableName: 'Takes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}