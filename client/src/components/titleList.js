
////////////////
// Title List //
////////////////

// Title List Container
import React from "react";
import imageData from '../utils/image.json'
import {useMutate} from "restful-react";
import {addMyCourseAPI, deleteMyCourseAPI} from "../api/client";

var createClass = require('create-react-class');
var i = -1;

export var TitleList = createClass({

    apiKey: '87dfa1c669eea853da609d4968d294be',
    getInitialState: function() {
        return {data: imageData.cse, mounted: false, lectureData:[]};
    },
    loadContent: function() {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        const courses = JSON.parse(sessionStorage.getItem('identity'));
        console.log(courses);
        this.setState({lectureData: courses.Courses === undefined? []: courses.Courses})
      console.log(typeof this.state.lectureData);
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
        console.log( this.props);
        return (
            <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
                <div className="Title">
                    <h1>{this.props.title}</h1>
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
        console.log(e.lecture.id);
        console.log(isTaking);
        if(window.location.pathname === '/content'){
            if(e.userData.occupation === 'Faculty'){
                dynamicData = undefined;
            }else{
                dynamicData = e.lecture.Takes.StudentId;
            }
            // dynamicData = e.lecture.Takes.StudentId;
        }else{

            if(e.identity.Courses !== undefined){
                for( let i = 0 ; i < e.identity.Courses.length; i ++){
                    if(e.identity.Courses[i].id === e.lecture.id){
                        isTaking = true;
                        break;
                    }else{
                        isTaking = false;
                    }
                }
            }

            if(e.userData.occupation === 'Faculty'){

            }else{
                courseData = e.lecture.Faculties[0]
                dynamicData = e.identity.id;
            }
        }
        return (
            <div className="Item"  style={{backgroundImage: 'url(' + e.imageLink + ')'}} >
                    <a href={window.location.pathname === '/content'? e.lecture.zoomLink: '#' } rel="noopener noreferrer">
                    <div className="overlay">
                        <div className="title">{e.lecture.cname}</div>
                        {/*<div className="rating">{this.props.score} / 10</div>*/}
                        {/*<div className="plot">{e.lecture.Faculties[0].office}</div>*/}
                        {/*<div className="plot">{e.lecture.Faculties[0].Teaches.semester}</div>*/}
                        <div className="plot">{e.lecture.status? "Available":"Disable"}</div>
                        {dynamicData === undefined || window.location.pathname === '/content'?
                            <></> :
                            <ListToggle courseId={e.lecture.id} facultyId={e.lecture.Faculties[0].id} studentId={dynamicData} isToggle={isTaking}/>
                        }

                    </div>
                </a>
            </div>
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
