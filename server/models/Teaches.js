const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    const Teaches = sequelize.define('Teaches',{
            semester: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: false
            },
        }, {
            sequelize,
            underscored: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    return Teaches;
}