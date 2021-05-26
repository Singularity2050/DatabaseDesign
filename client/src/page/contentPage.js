import React from 'react';
import '../css/Content.css';
import Header from "../components/header";
import MainPost from "../components/mainPost";
import TitleList from "../components/titleList";

function ContentPage(props){

    return(
        <div>
            <Header user={props.user} onSubmit={props.performSearch} />
            <MainPost />
            <TitleList lecture={props.lecture} title="Your Course"/>
            <TitleList lecture={props.lecture} title="Your Assignment" />
        </div>
    );
}
export default ContentPage;