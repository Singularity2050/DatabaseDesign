const Sequelize = require('sequelize');
module.exports = (sequelize,DataTypes) => {
    const Courses = sequelize.define('Courses',{
            cname:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique:false,
            },
            zoomLink:{
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
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })

    return Courses;
}