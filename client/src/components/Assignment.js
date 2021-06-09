
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

export var Assignment = createClass({


    getInitialState: function() {
        return {data: imageData.cse, mounted: false, lectureData:[]};
    },

    loadContent: function() {
        console.log(this.props.lecture);
    },
    componentDidMount: function() {
        this.loadContent();
        this.setState({ mounted: true });
    },
    componentWillUnmount: function() {
        this.setState({ mounted: false });
    },
    render: function() {
        let index =0;
        return (
            <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
                <div className="Title">
                    <h1>{this.props.title}</h1>
                    <div className="titles-wrapper">
                        {this.props.lecture.map( (e) => {
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
    // console.log(e.lecture.Assignments[0].aname);
    const isAssignment = e.lecture.Assignments.length !== 0;
    console.log(isAssignment);
    return (
        <>
            {isLecture ?
                isAssignment?
                <div className="Item"  style={{backgroundImage: 'url(' + e.imageLink + ')'}} >
                    <a href={window.location.pathname === '/content'? e.lecture.Assignments[0].aname: '/' } target="_blank" rel="noopener noreferrer">
                        <div className="overlay">
                            <div className="title">Course: {e.lecture.cname}</div>
                            <div className="plot">Due Date: {e.lecture.Assignments[0].dueDate}</div>
                        </div>
                    </a>
                </div>
                    :<></>
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

export default Assignment;
