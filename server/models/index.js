const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','/config/config.js'))[env];

const Users = require('./Users');
const Lecture = require('./Lecture');
const rUserLecture = require('./rUserLecture');
const Assignments = require('./Assignments');
const Exams = require('./Exams');
const Have = require('./Have');
const ProfMajors = require('./ProfMajors');
const StuMajors = require('./StuMajors');
const Takes = require('./Takes');
const Teaches = require('./Teaches');
const Courses = require('./Courses');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Lecture = Lecture;
db.rUserLecture = rUserLecture;
db.Assignments = Assignments;
db.Exams = Exams;
db.Have = Have;
db.ProfMajors = ProfMajors;
db.StuMajors = StuMajors;
db.Takes = Takes;
db.Teaches = Teaches;
db.Courses = Courses;

Users.init(sequelize);
Lecture.init(sequelize);
rUserLecture.init(sequelize);
Assignments.init(sequelize);
Exams.init(sequelize);
Have.init(sequelize);
ProfMajors.init(sequelize);
StuMajors.init(sequelize);
Takes.init(sequelize);
Teaches.init(sequelize);
Courses.init(sequelize);

// //noti
//Users.hasMany(Lecture,{foreignKey:'UserId',sourceKey:'id'})
//Lecture.belongsTo(Users,{foreignKey:'UserId',sourceKey:'id'})

Users.belongsTo(StuMajors,{foreignKey:'smid'});
Users.belongsTo(ProfMajors,{foreignKey:'pmid'});
Teaches.belongsTo(Users, {foreignKey:'uid'});
Teaches.belongsTo(Courses, {foreignKey:'cid'});
Takes.belongsTo(Users, {foreignKey:'uid'});
Takes.belongsTo(Courses, {foreignKey:'cid'});
Have.belongsTo(Assignments, {foreignKey:'aid'});
Have.belongsTo(Exams, {foreignKey:'eid'});

//Users.belongsToMany(Lecture,{through:'rUserLecture'});
//Lecture.belongsToMany(Users,{through:'rUserLecture'});

module.exports = db;