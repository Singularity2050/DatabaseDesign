import React from 'react';
import '../css/Content.css';
import Header from "../components/header";
import MainPost from "../components/mainPost";
import TitleList from "../components/titleList";
import {courseDetailInfoAPIMethod, findMyInfoAPIMethod, studentInfoAPIMethod, userInfoAPIMethod} from "../api/client";
import Assignment from "../components/Assignment";

function ContentPage(props){
    // TODO: 'if the user don't have any course and assignment, make it no pic'
    //TODO: 'My Course?'
    //TODO: 'Browse?'
    //TODO: 'Search Bar?'
    // TODO: 'change text'
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const assignment = JSON.parse(sessionStorage.getItem('identity'));

    console.log(userData);
    courseDetailInfoAPIMethod(userData.occupation,userData.id).then( r =>{
        console.log(r);
        sessionStorage.setItem('courseDetail',JSON.stringify(r));
    })
    let assignments;
    if(assignment === null || assignment.myCourseInfo == null){
        assignments = [];
    }else{
        assignments= assignment.myCourseInfo
    }
    return(
        <div>
            <Header user={props.user} onSubmit={props.performSearch} />
            <MainPost />
            <TitleList lecture={[props.lecture]} user={userData} title="Your Course"/>
            <Assignment lecture={assignments} user={userData} title="Your Assignments"/>
        </div>
    );
}
export default ContentPage;