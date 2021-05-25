import React, {useState} from 'react';
import '../css/Content.css';
import Header from "../components/header";
import MainPost from "../components/mainPost";
import TitleList from "../components/titleList";

function ContentPage(props){

    return(
        <div>
            <Header user={props.user} onSubmit={props.performSearch} />
            <MainPost />
            <TitleList lecture={props.lecture} title="Your Major Course" url='discover/tv?sort_by=popularity.desc&page=1' />
            <TitleList lecture={props.lecture} title="Your Elective Course" url='discover/movie?sort_by=popularity.desc&page=1' />
            <TitleList lecture={props.lecture} title="Other Course" url='genre/27/movies?sort_by=popularity.desc&page=1' />
            <TitleList lecture={props.lecture} title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
            <TitleList lecture={props.lecture} title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />
        </div>
    );
}
export default ContentPage;