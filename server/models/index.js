const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','/config/config.js'))[env];

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Users = require('./Users')(sequelize,Sequelize);
const Assignments = require('./Assignments')(sequelize,Sequelize);
const Exams = require('./Exams')(sequelize,Sequelize);
const Have = require('./Have')(sequelize,Sequelize);
const Faculty = require('./Faculty')(sequelize,Sequelize);
const Student = require('./Student')(sequelize,Sequelize);
const Takes = require('./Takes')(sequelize,Sequelize);
const Teaches = require('./Teaches')(sequelize,Sequelize);
const Courses = require('./Courses')(sequelize,Sequelize);
const HaveExam = require('./HaveExam')(sequelize,Sequelize);
const User2 = require('./Users2')(sequelize,Sequelize);
const Courses2 = require('./Courses2')(sequelize,Sequelize);

db.Users = Users;
db.Assignments = Assignments;
db.Exams = Exams;
db.Have = Have;
db.Faculty = Faculty;
db.Student = Student;
db.Takes = Takes;
db.Teaches = Teaches;
db.Courses = Courses;
db.HaveExam = HaveExam;
db.User2 = User2;
db.Courses2= Courses2;
//---------------------------------------------------------------------------------------------------------
// Key Constraint

//User
db.User2.belongsTo(db.Users,{foreignKey:'uid'});
db.Student.belongsTo(db.Users,{foreignKey:'uid'});// uid is created automatically in the Student Table
db.Faculty.belongsTo(db.Users,{foreignKey:'uid'});// uid is created automatically in the Faculty Table
//Teaches m:n
db.Courses2.belongsTo(db.Courses, {foreignKey:'cid'})
db.Courses.belongsToMany(db.Faculty,{through:'Teaches'}); // CourseId -> Teaches
db.Faculty.belongsToMany(db.Courses,{through:'Teaches'}); // FacultyId ->Teaches
//Take m:n
db.Student.belongsToMany(db.Courses,{through:'Takes'}); // n:m relation. one Student can have multiple Courses through Takes
db.Courses.belongsToMany(db.Student, {through:'Takes'}) // one Course can be consisted from multiple Students

//Assignment
db.Courses.belongsToMany(db.Assignments,{through:'Have'})
db.Assignments.belongsTo(db.Courses);//1:n relation one Course can have multiple Assignment through Have

//Exam
db.Exams.belongsToMany(db.Courses,{through:'HaveExam'});// 1:n relation one Course can have multiple Exam though HaveExam
//---------------------------------------------------------------------------------------------------------
module.exports = db;