
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const User2 = sequelize.define('User2',{
        upload_permission:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        lecture_access:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            allowNull: false,
            defaultValue: false,
        }
    },{
        sequelize,
        modelName: 'User2',
        tableName: 'Users2',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })

    return User2;
};
