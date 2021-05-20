const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Sequelize = require('sequelize');
const path = require('path');
const { Users,Lecture, rUserLecture} = require('../models');
const fs = require('fs');
const router = express.Router();

// const { User,Post,COMMENT,Love,Noti}  = require('../models');
const { request } = require('http');
const Op = Sequelize.Op;
const DatauriParser = require('datauri/parser');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');


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
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

//Profile
router.post('/lectureData',singleUploadCtrl,wrapAsync(async function(req,res,next){
    console.log(req.body);
}))

router.post('/profileData',singleUploadCtrl,wrapAsync(async function(req,res,next){
    let finalData =[];
    //faculty
    let container =[];
    //Student
    let lectureContainer = [];
    if( req.body.mode == "Faculty") {
        await Lecture.destroy({where:{UserId:req.body.userId}})
        const newCourseData = JSON.parse(req.body.newCourse);

        for (const e of newCourseData) {
             const lecture =await Lecture.create({
                UserId: parseInt(req.body.userId),
                professor: req.body.nickName,
                lectureCategory: req.body.major,
                lectureName: e[0],
                lectureDescription: e[1],
                lectureLink: e[2],
            });
            container.push(lecture);}
        //if Student
    }else{
        //delete all
        await rUserLecture.destroy({where:{UserId: req.body.userId}});

        const majorCourseList = JSON.parse(req.body.majorCourse);
        const electiveCourseList = JSON.parse(req.body.electiveCourse);

        //make new connection
        for(let i = 0; i < majorCourseList.length; i++){
            const lecture = await Lecture.findOne({where:{lectureName:majorCourseList[i]}});
            console.log(lecture.dataValues.id)
            await rUserLecture.create({ lectureType: "Major", UserId: parseInt(req.body.userId), LectureId: parseInt(lecture.dataValues.id)});
        }
        for(let i = 0; i < electiveCourseList.length; i++){
            const lecture = await Lecture.findOne({where:{lectureName:electiveCourseList[i]}});
            await rUserLecture.create({ lectureType: "Elective",UserId: parseInt(req.body.userId), LectureId : parseInt(lecture.dataValues.id)});
        }
        lectureContainer.push(majorCourseList);
        lectureContainer.push(electiveCourseList);
    }
    // console.log(container);
    let user = await Users.findOne({where: {id :parseInt(req.body.userId)}});
    console.log(user);
    console.log(req.body);
    if(req.body.image === undefined){
        const file64 = formatBufferTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64.content);
        await console.log(uploadResult);
        user.nickName = req.body.nickName;
        user.major = req.body.major;
        user.image = uploadResult.secure_url;
        await user.save();
    }else{
        user.nickName = req.body.nickName;
        user.major = req.body.major;
        user.image = req.body.image;
        await user.save();
    }
    finalData.push(container);
    finalData.push(user);
    finalData.push(lectureContainer);
    return res.json(finalData);
}));

// router.get('/',async(req,res)=>{
//
// })

// router.post('/', async (req, res, next) => {
//
// })
module.exports = router;