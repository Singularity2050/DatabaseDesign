
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            uid:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            uname:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
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
            image:{
                type: Sequelize.STRING(300),
            },
            isStudent:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            uploadPermission:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },

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


