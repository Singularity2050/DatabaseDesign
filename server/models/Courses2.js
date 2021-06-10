const Sequelize = require('sequelize');
module.exports = (sequelize,DataTypes) => {
    const Courses = sequelize.define('Courses',{
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false
        },
    }, {
        sequelize,
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })

    return Courses;
}