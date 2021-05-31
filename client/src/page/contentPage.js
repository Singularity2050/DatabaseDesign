import React from 'react';
import '../css/Content.css';
import Header from "../components/header";
import MainPost from "../components/mainPost";
import TitleList from "../components/titleList";

function ContentPage(props){
    // TODO: 'if the user don't have any course and assignment, make it no pic'
    //TODO: 'My Course?'
    //TODO: 'Browse?'
    //TODO: 'Search Bar?'
    // TODO: 'change text'
    console.log(props.lecture);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return(
        <div>
            <Header user={props.user} onSubmit={props.performSearch} />
            <MainPost />
            <TitleList lecture={[props.lecture]} user={userData} title="Your Course"/>
            <TitleList lecture={[props.lecture]} user={userData} title="Your Assignment" />
        </div>
    );
}
export default ContentPage;