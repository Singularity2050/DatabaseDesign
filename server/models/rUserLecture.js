
const Sequelize = require('sequelize');

module.exports = class rUserLecture extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            lectureType:{
                type: Sequelize.STRING(45),
                allowNull: true,
                unique:false,
            }
        }, {
            sequelize,
            modelName: 'rUserLecture',
            tableName: 'rUserLecture',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};


