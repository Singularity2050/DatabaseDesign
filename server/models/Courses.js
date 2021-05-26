const Sequelize = require('sequelize');
module.exports = class Courses extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            cid:{
                type: Sequelize.STRING(45),
                allowNull: false,
                primaryKey: true,
            },
            cname:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            zoomlink:{
                type: Sequelize.STRING(100),
                allowNull: false,
                unique:false,
            },
            status:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                unique: false
            },
            type:{
                type: Sequelize.STRING(8),
                allowNull: false,
                unique: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Courses',
            tableName: 'Courses',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
}