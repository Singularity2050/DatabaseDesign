const express = require('express');
const {findFacultyInfo} = require("./middlewares");
const {findStudentInfo} = require("./middlewares");
const {findOrCreateUser} = require("./middlewares");
// const User = require('../models/user');
const { sequelize } = require('../models');
const { Users,Courses, Teaches, Faculty,Student} = require('../models');
const router = express.Router();

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
})

router.get('/lecture',async(req,res)=>{
    console.log(req);
})

module.exports = router;