const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const User = require('../models/user');
const { sequelize } = require('../models');
const { Users,Lecture, rUserLecture} = require('../models');
const router = express.Router();


router.get('/logout', isLoggedIn, (req, res) => {
    res.clearCookie('connect.sid');
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.post('/google',async(req,res) =>{
    let myLecture;
    let lecture = [];
    let data;
    console.log(req.body.imageUrl);
    const user = await Users.findOrCreate(
        {where:{googleId:req.body.googleId},
        defaults:{
        image:req.body.imageUrl,
        email:req.body.email,
        nickName:req.body.name,
    }});
    const userData = user[0].dataValues;
    console.log(userData.occupation);

    if(userData.occupation == 'Faculty'){
       myLecture = await Lecture.findAll({where: {UserId:userData.id }})
        myLecture.forEach( e =>{lecture.push(e.dataValues);})
        data  = [userData,lecture,''];
        res.json(data)
    }else{
        myLecture = await rUserLecture.findAll({where:{UserId:userData.id}})

        for (const e of myLecture) {
            console.log(e.dataValues);
            const course = await Lecture.findOne({where:{id: e.dataValues.LectureId}})
            course.dataValues.type = e.dataValues.lectureType;
            lecture.push(course.dataValues);
        }
        console.log(lecture);
        data  = [userData,'',lecture];
        res.json(data)
    }
})

module.exports = router;