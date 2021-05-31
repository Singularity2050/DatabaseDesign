const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const Have = sequelize.define('Have',{
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    return Have;
}