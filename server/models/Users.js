
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User',{
        name: {
            type: Sequelize.STRING(45),
            allowNull: true,
            unique: false,
        },
        major:{
            type: Sequelize.STRING(300),
            allowNull: true,
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
            allowNull: false,
        },
        occupation:{
            type: Sequelize.STRING(300),
            allowNull: true,
            defaultValue: "Student",
        },
        verified:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:false,
        },
    },{
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'Users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })

    return User;
};
