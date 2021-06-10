

const sequelize = require('sequelize');
const db = require("../models");
const{Users, Faculty,Courses, Teaches,Takes,Student,Assignments,Exams,HaveExam,Have} = db;

//-------------------------------------------------------------------------------------
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {//if user is already login, then req.Authenticated() is true.
        next();
    } else {
        res.send('<script type="text/javascript">alert("Please login to see this post");window.location.replace("/login")</script>')
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('You are already logged in');
        res.send('<script type="text/javascript">alert("You are already logged in");window.location.replace("/")</script>')
    }
};

exports.findOrCreateUser = async (req,res,next) =>{
    const user =await Users.findOrCreate(
        {where:{googleId:req.body.googleId},
            defaults:{
                email:req.body.email,
                image: req.body.imageUrl,
                nickName:req.body.name,
            }}).catch( r => {console.log(r); return null;});

    return user[0].dataValues;
}

exports.findStudentInfo = async (req,res,next) =>{
    const student = await Student.findOne({
        where: {uid: req},
        include: { model:db.Courses,
            include:{ model:db.Faculty,
                include:{model:db.Users}}} // student id -> Course -> Faculty
    })
        .catch( r => { console.error('error : ' + r)});

    return student;
}
exports.findFacultyInfo = async (req,res,next) =>{

    const faculty = await db.Faculty.findOne({
        where:{uid:req},
        include:{model:db.Courses,
            include:{model:db.Faculty,include:{model:db.Users}},
            }

    }).catch( r => { console.error('error : ' + r)});
    return faculty;
}
exports.findAssignments = async (req,res,next) =>{
    let courseContainer = [];
    for (const e of req) {
        let courseId = e.dataValues.id;

        const assignment = await db.Courses.findOne({
            where: courseId,
            include:{model:db.Assignments}
        }).catch( r => { console.error('error : ' + r)});
        courseContainer.push(assignment);
    }
    return courseContainer;
}

//--------------------Student Create, Update ------------------------
exports.createStudent = async (req,res,next) =>{
    const student  = await Student.create({
        studentId: parseInt(req.body.subData),
        uid: parseInt(req.body.userId),
    }).catch( r => { console.error('error : ' + r)});
    return student.dataValues;
}
exports.updateStudent = async (req,res,next) =>{
    const student = await Student.findOne(
        {where:{uid: parseInt(req.body.userId)}})
        .catch(r => {console.error('error' + r)});
    student.studentId = parseInt(req.body.subData);
    await student.save();
    return student.dataValues;
}
//----------------------Faculty Create, Update-------------------
exports.createFaculty = async (req,res,next) =>{
    const uid = parseInt(req.body.userId);
    const faculty = await Faculty.create({
        office: req.body.subData,
        uid: uid,
    }).catch( r => { console.error('error : ' + r)});
    return faculty.dataValues;
}
exports.updateFaculty = async (req,res,next) =>{
    const uid = parseInt(req.body.userId);
    const faculty = await Faculty.findOne(
        {where:{uid: uid}})
        .catch(r => {console.error('error' + r)});
    faculty.studentId = uid;
    await faculty.save();
    return faculty.dataValues;
}
//---------------User : find, update,
exports.findUserInfo = async(req,res,next) =>{
    let user = await Users.findOne({where: {id :parseInt(req.body.userId)}});
    return user;
}
exports.updateUserInfo = async (req,res,next) =>{

    let user = req.body.user;

    user.nickName = req.body.nickName;
    user.major = req.body.major;
    user.name = req.body.name;
    user.occupation = req.body.occupation;
    user.verified = true;
    await user.save();
    return user.dataValues;
}
//---------------Course,
exports.findCourses = async (req,res,next) =>{
    let courses = [];
    const rawCourses = await Courses.findAll({
        where:{type:req.major},
        include:{model:db.Faculty,
            include:{model:db.Users}}
    })
        .catch(r =>{ console.error('error: '+ r)});
    await rawCourses.forEach( e =>{
        courses.push(e.dataValues);
    })
    return courses;
}
exports.createMyLecture = async (req,res,next) =>{
    const take = await Takes.create({
        semester: 'fall',
        StudentId: req.studentId,
        CourseId: req.courseId
    })
    return take;
}

exports.deleteMyLecture = async (req,res,next) =>{
    const take = await Takes.findOne({
        where:{
            semester: 'fall',
            StudentId: parseInt(req.studentId),
            CourseId: parseInt(req.courseId)
        }
    })
    take.destroy();
    return take;
}

exports.createOrUpdateCourses = async (req,res,next) =>{
    let date =new Date()
    let modifiedCourse;
    let courseId;
    let result = [];
    console.log('start');
    for(let i = 0 ; i < req.length; i ++){
        console.log(i+'th loop')
        //if data is modified
        console.log(1);
        if(req[i].modified){
            console.log(2);
            //if the course is new created
            if(req[i].id === undefined){
                console.log(3);
                const newCourse = await Courses.create({
                    cname: req[i].cname,
                    zoomLink : req[i].zoomLink,
                    status: false,
                    type: req[i].type
                })
                console.log(4);
                const newTeach = await Teaches.create({
                    CourseId: newCourse.dataValues.id,
                    FacultyId: req.facultyId,//req.body.FacultyId,
                    semester: "Fall"
                });
                console.log(5);
                //if input has assignment data;
                if ( req[i].Assignments.length> 0) {
                    console.log(6);
                    const assignment = await Assignments.create({
                        aname: req[i].Assignments[0].aname,
                        dueDate: date.setDate(date.getDate() + 14)
                    })
                    console.log(assignment);
                    console.log(7);
                    await Have.create({
                        CourseId: newCourse.dataValues.id,
                        AssignmentId: assignment.dataValues.id
                    })
                }// if there is no assignment data in the input then pass

            }else{//if the course is already in database
                console.log(8);
                const course = await Courses.findOne({where:{id:req[i].id}})
                course.cname = req[i].cname;
                course.zoomLink = req[i].zoomLink;
                course.type = req[i].type;
                course.save();
                course.reload();
                //if there is assignment
                if (req[i].Assignments.length > 0) {
                    console.log(9);
                    const assignment = await Assignments.findOne({where: req[i].Assignments[0].id})
                    //if it is new assignment
                    if(assignment === null){
                        console.log(10);
                        const newAssignment = await Assignments.create({
                            aname: req[i].Assignments[0].aname,
                            dueDate: date.setDate(date.getDate()+14)
                        })
                        await Have.create({
                            CourseId: course.id,
                            AssignmentId: newAssignment.dataValues.id
                        })
                    }else{//if assignment is already existed
                        console.log(11);
                        console.log(req[i].Assignments[0].aname);
                        console.log(req[i].Assignments[0].id);
                        await Assignments.update({
                            aname: req[i].Assignments[0].aname
                        }, {
                            where: {id: req[i].Assignments[0].id}
                        });
                    }
                }// if there is no assignment, pass.
            }}}

        return result;
        }

exports.wrapAsync = (fn) =>{
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
