
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const Assignments = sequelize.define('Assignments',{
            aname:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false,
            },
            dueDate:{
                type:Sequelize.DATE,
                allowNull:false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });

    return Assignments;
};