
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickName:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            email:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:true,
            },
            googleId:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:true,
            },
            major:{
                type: Sequelize.STRING(45),
                allowNull: true
            },
            image:{
                type: Sequelize.STRING(300),
            },
            occupation:{
                type: Sequelize.STRING(300),
                defaultValue:"Student"
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'Users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};


