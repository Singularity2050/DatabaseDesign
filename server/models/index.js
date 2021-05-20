const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','/config/config.js'))[env];

const Users = require('./Users');
const Lecture = require('./Lecture');
const rUserLecture = require('./rUserLecture');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Lecture = Lecture;
db.rUserLecture = rUserLecture;
// db.Love = Love;
// db.Noti = Noti;
//
Users.init(sequelize);
Lecture.init(sequelize);
rUserLecture.init(sequelize);
// Love.init(sequelize);
// Noti.init(sequelize);
//
// //noti
Users.hasMany(Lecture,{foreignKey:'UserId',sourceKey:'id'})
Lecture.belongsTo(Users,{foreignKey:'UserId',sourceKey:'id'})
Users.belongsToMany(Lecture,{through:'rUserLecture'});
Lecture.belongsToMany(Users,{through:'rUserLecture'});
// Post.hasMany(Noti);
// Noti.belongsTo(Post);
// // COMMENT.hasMany(Noti);
// // Noti.belongsTo(COMMENT);
// // Love.hasMany(Noti);
// // Noti.belongsTo(Love);
//
// db.User.hasMany(db.Post);
// db.User.hasMany(db.Love);
//
// db.Post.belongsTo(db.User);
// db.Post.hasMany(db.Love);
// db.Post.hasMany(db.COMMENT);
//
// //Love
// db.Love.belongsTo(db.Post);
// db.Love.belongsTo(db.COMMENT);
// db.Love.belongsTo(db.User);
//
//
// db.COMMENT.hasMany(db.Love);
// db.COMMENT.belongsTo(db.Post);
// db.COMMENT.belongsTo(db.User);

module.exports = db;