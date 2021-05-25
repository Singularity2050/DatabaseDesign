const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','/config/config.js'))[env];

const Users = require('./Users');
const Lecture = require('./Lecture');
const rUserLecture = require('./rUserLecture');
const Students = require('./Students');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Lecture = Lecture;
db.rUserLecture = rUserLecture;
db.Students = Students;

Users.init(sequelize);
Lecture.init(sequelize);
rUserLecture.init(sequelize);
Students.init(sequelize);

// //noti
Users.hasMany(Lecture,{foreignKey:'UserId',sourceKey:'id'})
Lecture.belongsTo(Users,{foreignKey:'UserId',sourceKey:'id'})

Users.belongsToMany(Lecture,{through:'rUserLecture'});
Lecture.belongsToMany(Users,{through:'rUserLecture'});

module.exports = db;