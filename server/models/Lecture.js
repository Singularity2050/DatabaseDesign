const Sequelize = require('sequelize');
module.exports = class Lecture extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            professor:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            lectureCategory:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            lectureName:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            lectureDescription:{
                type: Sequelize.TEXT,
                allowNull: false,
                unique:false,
            },
            lectureLink:{
                type: Sequelize.STRING(100),
                allowNull: false,
                unique:false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Lecture',
            tableName: 'Lectures',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
}