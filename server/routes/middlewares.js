

const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const sequelize = require('sequelize');
const db = require("../models");
const{Users, Faculty,Courses, Teaches,Takes,Student} = db;

const {Model} = require("sequelize");
const parser = new DatauriParser();
const ALLOWED_FORMATS = ['image/jpeg','image/png','image/jpg'];
const formatBufferTo64 = file =>
    parser.format(path.extname(file.originalname).toString(),file.buffer)

const storage= multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: function(req,file,cb){
        if(ALLOWED_FORMATS.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Not supported file type!'),false);
        }
    }
})
const singleUpload = upload.single('image');

exports.singleUploadCtrl = (req,res,next) =>{
    singleUpload(req,res,(error)=>{
        if(error){
            return res.status(422).send({message:"Image upload fail!"});
        }
        next();
    })
}
cloudinary.config({
    cloud_name: 'dmjiv91uu',
    api_key: '275859854347512',
    api_secret: 'igFTtALlFAs8oXOdB5fIb_60PSc'
});
const cloudinaryUpload = file => cloudinary.uploader.upload(file);
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
    const student = await Student.findOne({
        where: {uid: req},
        include: { model:Courses, include:{ model:Faculty}}
    }).catch( r => { console.error('error : ' + r)});
    return student;
}
exports.findFacultyInfo = async (req,res,next) =>{
    console.log('here');
    console.log(req);
    const faculty = await db.Faculty.findOne({
        where:{uid:req},
        include:[db.Courses]
    }).catch( r => { console.error('error : ' + r)});
    return faculty;
    // const faculty = await Faculty.findOne({where:{id:1}});
    // console.log(await faculty.getCourses());

    // await faculty.addCourse(newCourse, { through: { semester:"fall" } });
    // const result = await Faculty.findOne(
    //     {where:{ FacultyId:2}},
    // ).catch( r => { console.error('error : ' + r)});
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
    let user = await Users.findOne({where: {id :parseInt(req.body.userId)}});
    return user;
}
exports.updateUserInfo = async (req,res,next) =>{
    let user = req.body.user;
    if(req.body.image === undefined){
        const file64 = formatBufferTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64.content);
        user.image = uploadResult.secure_url;
    }else{
        user.image = req.body.image;
    }
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
        include:[db.Faculty]
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
            StudentId: req.studentId,
            CourseId: req.courseId
        }
    })
    take.destroy();
    return take;
}
// exports.findCoursesById = async (req,res,next) => {
//
// }
//TODO:'no direct update'
exports.createOrUpdateCourses = async (req,res,next) =>{
    console.log(req);
    let newCourse;
    let modifiedCourse;
    await req.forEach(  e => {
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
                    console.log(r.dataValues);
                    Teaches.create({
                        CourseId: r.dataValues.id,
                        FacultyId: e.facultyId,//req.body.FacultyId,
                        semester: "Fall"
                    })
                    return r;
                }).catch(r =>{ console.error('error: '+ r)})
            }else{//update
                console.log(4);
                modifiedCourse = Courses.findOne({where:{id:e.id}})
                    .then( r =>{
                        r.cname = e.cname;
                        r.zoomLink = e.zoomLink;
                        r.type = e.type;
                        r.save();
                    })
                    .catch(r =>{ console.error('error: '+ r)})
                console.log(5);
                return null;
            }
        }
    })
}
exports.wrapAsync = (fn) =>{
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
