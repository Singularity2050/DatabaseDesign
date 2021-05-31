const express = require('express');
const {findFacultyInfo} = require("./middlewares");
const {findStudentInfo} = require("./middlewares");
const {findOrCreateUser} = require("./middlewares");
// const User = require('../models/user');
const { sequelize } = require('../models');
const { Users,Courses, Teaches, Faculty,Student} = require('../models');
const router = express.Router();

router.get('/facultyInfo/:id',async(req,res) =>{
    console.log(req.query);
})
router.get('/studentInfo/:id',async(req,res) =>{
    console.log(req.query);
})
router.post('/google',async(req,res) =>{
    let userData = [];
    //findUser
    const user =await findOrCreateUser(req);
    userData.push(user);
    let identity;
    console.log(user);
    if( user.verified){
        if(user.occupation === "Student"){
            console.log(1);
            identity =await findStudentInfo(user.id)
        }else{
            identity = await findFacultyInfo(user.id)
            console.log(identity);
        }
        userData.push(identity);
        res.json(userData);
    }else{
        res.json(userData)
    }
    // let myLecture;
    // let lecture = [];
    // let data;
    // const userData = user[0].dataValues;
    // console.log(userData.occupation);
    //
    // if(userData.occupation == 'Faculty'){
    //    myLecture = await Lecture.findAll({where: {UserId:userData.id }})
    //     myLecture.forEach( e =>{lecture.push(e.dataValues);})
    //     data  = [userData,lecture,''];
    //     res.json(data)
    // }else{
    //     myLecture = await rUserLecture.findAll({where:{UserId:userData.id}})
    //     if(myLecture){
    //         for (const e of myLecture) {
    //             const course = await Courses.findOne({where:{id: e.dataValues.LectureId}})
    //             course.dataValues.type = e.dataValues.lectureType;
    //             lecture.push(course.dataValues);
    //         }
    //     }
    //     console.log(lecture);
    //     data  = [userData,'',lecture];
    //     res.json(data)
    // }
})
router.get('/lecture',async(req,res)=>{
    console.log(req);
})

module.exports = router;