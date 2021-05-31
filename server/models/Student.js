const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const Student = sequelize.define('Student',{
            studentId:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique:true,
            },

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });

    return Student;
}