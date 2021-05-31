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
console.log(db.Users);
//---------------------------------------------------------------------------------------------------------
// Key Constraint

//User
db.Student.belongsTo(db.Users,{foreignKey:'uid'});// uid is created automatically in the Student Table
db.Faculty.belongsTo(db.Users,{foreignKey:'uid'});// uid is created automatically in the Faculty Table
//Teaches m:n
db.Courses.belongsToMany(db.Faculty,{through:'Teaches'}); // CourseId -> Teaches
db.Faculty.belongsToMany(db.Courses,{through:'Teaches'}); // FacultyId ->Teaches


console.log(Courses);
db.Student.belongsToMany(db.Courses,{through:'Takes'}); // 1:n relation. one Student can have multiple Courses through Takes

//Assignment
db.Assignments.belongsToMany(db.Courses,{through:'Have'});//1:n relation one Course can have multiple Assignment through Have
//Exam
db.Exams.belongsToMany(db.Courses,{through:'HaveExam'});// 1:n relation one Course can have multiple Exam though HaveExam
//---------------------------------------------------------------------------------------------------------
module.exports = db;