

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
    console.log(req);
    console.log('test');
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
    console.log('here');
    console.log(req);
    const faculty = await db.Faculty.findOne({
        where:{uid:req},
        include:{model:db.Courses,
            include:{model:db.Faculty,include:{model:db.Users}},
            }

    }).catch( r => { console.error('error : ' + r)});
    return faculty;
}
exports.findAssignments = async (req,res,next) =>{
    console.log(req);
    let courseContainer = [];
    for (const e of req) {
        let courseId = e.dataValues.id;
        console.log('qwer');
        console.log(courseId);
        const assignment = await db.Courses.findOne({
            where: courseId,
            include:{model:db.Assignments}
        }).catch( r => { console.error('error : ' + r)});
        console.log(assignment);
        courseContainer.push(assignment);
    }
    return courseContainer;
}

//--------------------Student Create, Update ------------------------
exports.createStudent = async (req,res,next) =>{
    console.log('here2');
    console.log(req.body.userId);
    const student  = await Student.create({
        studentId: parseInt(req.body.subData),
        uid: parseInt(req.body.userId),
    }).catch( r => { console.error('error : ' + r)});
    console.log(student);
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
    console.log(req.body);
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
    console.log(req.body);
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
    console.log(courses);
    return courses;
}
exports.createMyLecture = async (req,res,next) =>{
    console.log(req);
    const take = await Takes.create({
        semester: 'fall',
        StudentId: req.studentId,
        CourseId: req.courseId
    })
    return take;
}

exports.deleteMyLecture = async (req,res,next) =>{
    console.log(req);
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
    let newCourse;
    let modifiedCourse;
    let courseId;
    let result = [];
    console.log('rewq');
    console.log(req[0]);
    await req.forEach(  e => {
        console.log('rewq22');
        console.log(e.Assignments[0].aname);
        console.log(1);
        if(e.modified){
            console.log(2);
            //create
            if(e.id === undefined){
                console.log(3);
                newCourse = Courses.create({
                    cname: e.cname,
                    zoomLink : e.zoomLink,
                    status: false,
                    type: e.type
                }).then(r =>{
                    console.log('12345');
                    console.log(req.facultyId);
                    courseId = r.dataValues.id;
                    console.log(r.dataValues);
                    Teaches.create({
                        CourseId: r.dataValues.id,
                        FacultyId: req.facultyId,//req.body.FacultyId,
                        semester: "Fall"
                    }).then( r => {
                        console.log('test33');
                        console.log(e);
                        if ( e.Assignments.length> 0) {
                            Assignments.create({
                                aname: e.Assignments[0].aname,
                                dueDate: date.setDate(date.getDate()+14)
                            }).then(r => {
                                Have.create({
                                    CourseId: courseId,
                                    AssignmentId: r.dataValues.id
                                })
                                result.push(r);
                            })
                        }
                        result.push(r);
                    })}).catch(r =>{ console.error('error: '+ r)})
            }else{//update
                console.log(4);
                console.log('here36');
                modifiedCourse = Courses.findOne({where:{id:e.id}})
                    .then( r =>{
                        r.cname = e.cname;
                        r.zoomLink = e.zoomLink;
                        r.type = e.type;
                        r.save();
                        courseId = r;
                    }).then( r =>{
                        console.log('here33');
                        console.log(e);
                        if (e.Assignments.length > 0) {
                            console.log('here33');
                            console.log(courseId);
                            Assignments.findOne({where: courseId.id,}).then(r => {
                                console.log('here55');
                                    console.log (courseId);
                                    console.log(e.Assignments[0].aname);
                                    r.aname = e.Assignments[0].aname
                                    r.save();
                                    console.log(courseId);
                                    Have.findOrCreate({where:courseId.id,
                                    defaults:{
                                        CourseId: courseId.id,
                                        AssignmentId: r.dataValues.id
                                    }})

                                result.push(r);
                            })
                        }
                    })
                    .catch(r =>{ console.error('error: '+ r)})
                console.log(5);
            }
        }
    })
    return result;
}
exports.updateAssignment = async (req,res) =>{
    console.log(req);
    // await Assignments.findOrCreate({where:})
}
exports.wrapAsync = (fn) =>{
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
