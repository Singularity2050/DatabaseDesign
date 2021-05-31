import React from 'react';
import '../css/Content.css';
import Header from "../components/header";
import MainPost from "../components/mainPost";
import TitleList from "../components/titleList";
import ContentList from "../components/contentList";
import imageData from '../utils/image.json'
function ContentPage(props){
    // TODO: 'if the user don't have any course and assignment, make it no pic'
    //TODO: 'My Course?'
    //TODO: 'Browse?'
    //TODO: 'Search Bar?'
    // TODO: 'change text'
    console.log(props.lecture);
    const path = window.location.pathname;
    const major = path.split('/')[2];
    console.log(major);
    const imageFile  = imageData.cse;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return(
        <div>
            <Header user={props.user} onSubmit={props.performSearch} />
            <br/><br/><br/>
            <ContentList lecture={[props.lecture]} user={userData} major={major} imageFile ={imageFile}/>
        </div>
    );
}
export default ContentPage;