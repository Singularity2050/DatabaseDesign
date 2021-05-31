
const {singleUploadCtrl, updateFaculty, updateStudent, wrapAsync} = require("./middlewares");
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Sequelize = require('sequelize');
const path = require('path');
const { Users,Courses, Teaches} = require('../models');
const fs = require('fs');
const {deleteMyLecture} = require("./middlewares");
const {createMyLecture} = require("./middlewares");
const {createOrUpdateCourses} = require("./middlewares");
const {findFacultyInfo} = require("./middlewares");
const {findCourses} = require("./middlewares");
const {createCourses} = require("./middlewares");
const {findCourse} = require("./middlewares");
const {findUserInfo} = require("./middlewares");
const router = express.Router();

// const { User,Post,COMMENT,Love,Noti}  = require('../models');
const { request } = require('http');
const Op = Sequelize.Op;


const {createFaculty, updateUserInfo,createStudent} = require("./middlewares");

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
router.get('/course/:major',singleUploadCtrl,wrapAsync(async function(req,res,next){
    let courses = await findCourses(req.params);
    console.log(courses);
    res.json(courses);
}))

router.post('/profileData',singleUploadCtrl,wrapAsync(async function(req,res,next){
    //testing
    console.log(typeof req.body.newCourse ==='string');
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
        console.log(objectCourse);
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
            if(objectCourse.length != 0){
                console.log(5);
                let createdCourse = await createOrUpdateCourses(objectCourse);
                console.log('-----------------------');
                console.log(createdCourse)
                console.log('-----------------------');
            }
            await updateFaculty(req)
            identity = await findFacultyInfo(req.body.userId);
            console.log('-----------------------');
            // console.log(identity.Courses);
            console.log('-----------------------');
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
    //update user Info
    const updateUser = await updateUserInfo(req);

    //Merge identity and User Info
    userData.push(updateUser);
    userData.push(identity);
    // console.log('---------------------------------');
    // console.log(identity);
    // console.log('---------------------------------');
    //send to front-end server
    res.json(userData);
    // let finalData =[];
    // //faculty
    // let container =[];
    // //Student
    // let lectureContainer = [];
    // if( req.body.mode == "Faculty") {
    //     await Lecture.destroy({where:{UserId:req.body.userId}})
    //     const newCourseData = JSON.parse(req.body.newCourse);
    //
    //     for (const e of newCourseData) {
    //          const lecture =await Lecture.create({
    //             UserId: parseInt(req.body.userId),
    //             professor: req.body.nickName,
    //             lectureCategory: req.body.major,
    //             lectureName: e[0],
    //             lectureDescription: e[1],
    //             lectureLink: e[2],
    //         });
    //         container.push(lecture);}
    //     //if Student
    // }else{
    //     //delete all
    //     await rUserLecture.destroy({where:{UserId: req.body.userId}});
    //
    //     const majorCourseList = JSON.parse(req.body.majorCourse);
    //     const electiveCourseList = JSON.parse(req.body.electiveCourse);
    //
    //     //make new connection
    //     for(let i = 0; i < majorCourseList.length; i++){
    //         const lecture = await Lecture.findOne({where:{lectureName:majorCourseList[i]}});
    //         console.log(lecture.dataValues.id)
    //         await rUserLecture.create({ lectureType: "Major", UserId: parseInt(req.body.userId), LectureId: parseInt(lecture.dataValues.id)});
    //     }
    //     for(let i = 0; i < electiveCourseList.length; i++){
    //         const lecture = await Lecture.findOne({where:{lectureName:electiveCourseList[i]}});
    //         await rUserLecture.create({ lectureType: "Elective",UserId: parseInt(req.body.userId), LectureId : parseInt(lecture.dataValues.id)});
    //     }
    //     lectureContainer.push(majorCourseList);
    //     lectureContainer.push(electiveCourseList);
    // }
    // // console.log(container);

    // finalData.push(container);
    // finalData.push(user);
    // finalData.push(lectureContainer);
    // return res.json(finalData);
}));

// router.get('/',async(req,res)=>{
//
// })

// router.post('/', async (req, res, next) => {
//
// })
module.exports = router;