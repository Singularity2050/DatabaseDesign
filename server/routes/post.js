
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Sequelize = require('sequelize');
const path = require('path');
const { Users,Courses, Teaches} = require('../models');
const fs = require('fs');
const {
    findAssignments,
    deleteMyLecture,
    createMyLecture,
    createOrUpdateCourses,
    findCourses,
    findUserInfo,
    findStudentInfo,
    findFacultyInfo,
    updateFaculty,
    updateStudent,
    wrapAsync       } = require("./middlewares");

const {createCourses} = require("./middlewares");
const {findCourse} = require("./middlewares");

const router = express.Router();
const cloudinary = require('cloudinary').v2;

//IMAGE
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

const singleUploadCtrl = (req,res,next) =>{
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


//IMAGE

// const { User,Post,COMMENT,Love,Noti}  = require('../models');
const { request } = require('http');
const Op = Sequelize.Op;

const {createFaculty, updateUserInfo,createStudent} = require("./middlewares");
router.get('/findMyData/:occupation/:uid',wrapAsync(async function(req,res,next){
    let container;
    let myInfo ="";
    let myCourse ="";
    let myCourseInfo ="";
    console.log(req.params.occupation);
    if(req.params.occupation === "Student"){
        myInfo = await findStudentInfo(req.params.uid)
        console.log('qwe22');
        console.log(myInfo.dataValues.Courses);
        myCourse = myInfo.dataValues.Courses;
        myCourseInfo = await findAssignments (myCourse);
    }else if(req.params.occupation === "Faculty"){
        myInfo = await findFacultyInfo(req.params.uid);
        console.log('qwe22');
        myCourse = myInfo.dataValues.Courses;
        myCourseInfo = await findAssignments (myCourse);
    }
    myInfo.CourseInfo = myCourseInfo;
    console.log('start2"');
    container = {
        myInfo,
        myCourseInfo
    }
    res.json(container);
}))
router.get('/addMyCourse/:courseId/:studentId',wrapAsync(async function (req,res,next){
    console.log('test');
    const myLec =await createMyLecture(req.params);
    console.log(myLec);
}));
router.get('/deleteMyCourse/:courseId/:studentId',wrapAsync(async function (req,res,next){
    console.log('test');
    const myLec =await deleteMyLecture(req.params);
    console.log(myLec);
}));
//getCourse
router.get('/course/:major',wrapAsync(async function(req,res,next){
    let courses = await findCourses(req.params);
    console.log(courses);
    res.json(courses);
}))

router.post('/profileData',singleUploadCtrl,wrapAsync(async function(req,res,next){
    //testing
    // console.log(typeof req.body.newCourse);
    // console.log()
    //

    let objectCourse;
    let identity; //Student or Faculty?
    let courses;
    let userData = [];// User Basic data
    //get userdata from database, if no, it will return null
    const rawUserData = await findUserInfo(req);
    const user = rawUserData.dataValues;
    if(typeof req.body.newCourse === 'string'){
        console.log('test')
        if(req.body.newCourse !=='undefined'){
            objectCourse = JSON.parse(req.body.newCourse);
        }
    }
    console.log('-----------------------');
    console.log(user.verified);
    console.log('-----------------------');
    //Put the user data into req.body
    req.body.user = rawUserData;
    //If user does not filled out profile, then create, otherwise update.
    if(user.verified){
        if(req.body.occupation === 'Student'){
            console.log(1);
            identity = await updateStudent(req)
        }else{
            console.log(2);
            const faculty = await updateFaculty(req)
            identity = await findFacultyInfo(req.body.userId);
            if(objectCourse.length != 0){
                console.log(5);
                console.log('check')
                objectCourse.facultyId = identity.dataValues.id
                let createdCourse = await createOrUpdateCourses(objectCourse);
                console.log('checkhere')
            }
        }
    }else{
        if(req.body.occupation === 'Student'){
            console.log(3);
            identity =await createStudent(req)
        }else{
            console.log(4);
            identity =await createFaculty(req)
        }
    }
    if(req.body.image === undefined){
        const file64 = formatBufferTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64.content);
        req.body.user.image = uploadResult.secure_url;
    }else{
        req.body.user.image = req.body.image;
    }
    //update user Info
    const updateUser = await updateUserInfo(req);
    console.log('here331');
    //Merge identity and User Info
    userData.push(updateUser);
    userData.push(identity);

    //send to front-end server
    res.json(userData);

}));
router.get('/courseDetail/:occupation/:id',wrapAsync(async function(req,res,next){
    let identity;
    if(req.params.occupation === "Student"){
        console.log(1);
        identity =await findStudentInfo(req.params.id)
    }else{
        identity = await findFacultyInfo(req.params.id)
    }
    res.json(identity);
}));
router.get('/deleteCourse/:id',wrapAsync(async function(req,res,next){
    const course = await Courses.destroy({where:{id:req.params.id}});
    console.log(course);
    res.json(course);
}))
module.exports = router;