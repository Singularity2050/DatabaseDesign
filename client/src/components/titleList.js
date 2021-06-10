
////////////////
// Title List //
////////////////

// Title List Container
import React from "react";
import imageData from '../utils/image.json'
import {useMutate} from "restful-react";
import {
    addMyCourseAPI,
    courseDetailInfoAPIMethod,
    deleteMyCourseAPI,
    findMyInfoAPIMethod,
    userInfoAPIMethod
} from "../api/client";

var createClass = require('create-react-class');
var i = -1;

export var TitleList = createClass({

    apiKey: '87dfa1c669eea853da609d4968d294be',

    getInitialState: function() {
        return {data: imageData.cse, mounted: false, lectureData:[]};
    },

    loadContent: function() {
        const user = JSON.parse(sessionStorage.getItem('userData'));

        findMyInfoAPIMethod(user.occupation,user.id).then( r =>{
            let courses = JSON.parse(sessionStorage.getItem('courseDetail'))
            sessionStorage.removeItem('identity');
            sessionStorage.setItem('identity',JSON.stringify(r));
            console.log(courses);
            this.setState({lectureData: courses === null? []: courses.Courses})
            console.log(this.state.lectureData);
        })
    },
    componentDidMount: function() {
        this.loadContent();
        this.setState({ mounted: true });
    },
    componentWillUnmount: function() {
        this.setState({ mounted: false });
    },
    render: function() {
        let index = 0;
        console.log(this.state.lectureData);
        return (
            <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
                <div className="Title">
                    <h1 id="myList">{this.props.title}</h1>
                    <div className="titles-wrapper">
                        {this.state.lectureData.map( (e) => {
                          return ( <Item imageLink={this.state.data[index++]} lecture={e} userData={this.props.user}/>);
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

// Title List Item
export function Item(e){
        let dynamicData;
        let courseData;
        let isTaking = false;
        let isLecture = false;
        console.log(e);
        if(e.lecture !== undefined){
            isLecture = true;
        }
        if(window.location.pathname === '/content'){
            if(e.userData.occupation === 'Faculty'){
                dynamicData = undefined;
            }else{
                dynamicData = e.lecture.Takes.StudentId;
            }
        }else{
            console.log(e);
            if(e.userData.occupation === 'Faculty'){
                dynamicData = undefined;
            }else{
                dynamicData = e.identity.myInfo.id;
                console.log(e);
                if(e.identity.myCourseInfo !== undefined){
                    for( let i = 0 ; i < e.identity.myCourseInfo.length; i ++){
                        if(e.identity.myCourseInfo[i].id === e.lecture.id){
                            isTaking = true;
                            break;
                        }else{
                            isTaking = false;
                        }
                    }
                }
            }
        }
        console.log(dynamicData);
        if(e.lecture.zoomLink === undefined){
            e.lecture.zoomLink = "#"
        }
        return (
            <>
            {isLecture ?
            <div className="Item"  style={{backgroundImage: 'url(' + e.imageLink + ')'}} >
                {window.location.pathname === '/content'?
                    <a href= {e.lecture.zoomLink} target="_blank" rel="noopener noreferrer">
                    <div className="overlay">
                            <div className="title">{e.lecture.cname}</div>
                            <div className="plot">Faculty : {e.lecture.Faculties[0].User.name}</div>
                            <div className="plot">Office : {e.lecture.Faculties[0].office}</div>
                            <div className="plot">Semester : {e.lecture.Faculties[0].Teaches.semester}</div>
                            <div className="plot">Zoom Available: {e.lecture.status? "Available":"Disable"}</div>
                        {dynamicData === undefined || window.location.pathname === '/content'?
                            <></> :
                            <ListToggle courseId={e.lecture.id} facultyId={e.lecture.Faculties[0].id} studentId={dynamicData} isToggle={isTaking}/>
                        }
                    </div>
                </a>:
                    <div className="overlay">
                        <div className="title">{e.lecture.cname}</div>
                        <div className="plot">Faculty : {e.lecture.Faculties[0].User.name}</div>
                        <div className="plot">Office : {e.lecture.Faculties[0].office}</div>
                        <div className="plot">Semester : {e.lecture.Faculties[0].Teaches.semester}</div>
                        <div className="plot">Zoom Available: {e.lecture.status? "Available":"Disable"}</div>
                        {dynamicData === undefined || window.location.pathname === '/content'?
                            <></> :
                            <ListToggle courseId={e.lecture.id} facultyId={e.lecture.Faculties[0].id} studentId={dynamicData} isToggle={isTaking}/>
                        }
                    </div>}
                    </div>
                    : <></>}

            </>
        );
};

// ListToggle
var ListToggle = createClass({
    getInitialState: function() {
        return({ toggled: this.props.isToggle })
    },
    handleClick: function(e) {
        e.preventDefault()
        if(this.state.toggled === true) {
            this.setState({ toggled: false });
            deleteMyCourseAPI(this.props.courseId,this.props.studentId).then(r => console.log(r));

        } else {
            addMyCourseAPI(this.props.courseId,this.props.studentId).then(r => console.log(r));
            this.setState({ toggled: true });
        }
    },
    render: function() {

        return (
            <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
                <div>
                    <i className="fa fa-fw fa-plus"  ></i>
                    <i className="fa fa-fw fa-check"></i>
                </div>
            </div>
        );

    }
});

export default TitleList;
