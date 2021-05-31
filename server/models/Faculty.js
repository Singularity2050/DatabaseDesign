const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const Faculty = sequelize.define('Faculty',{
            office:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false
            },
        }, {
            sequelize,
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });

    return Faculty;
}