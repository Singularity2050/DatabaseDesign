
////////////////
// Title List //
////////////////

// Title List Container
import React from "react";
import {getCourseAPIMethod} from "../api/client";
import {Item} from "./titleList"
var createClass = require('create-react-class');

export default class ContentList extends React.Component{
    //get the course List from database;
    // console.log(props.lecture);

    constructor(props) {
        super(props);
        console.log(props);
        this.state ={'courses':[]}
        this.courseData = this.courseData.bind(this);
        this.courseData(this.props.major).then(r => {
            console.log(r);
            this.setState({'courses':r})
        });
    }

    courseData = (major) => getCourseAPIMethod(major);
    render() {
        // const courses = this.state;
        // const obj = JSON.parse(courses);
        let index = 0;
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const identity = JSON.parse(sessionStorage.getItem('identity'));

        return(
            <>
                <div  className="TitleList">
                    <div className="Title">
                        <h1>{this.props.major} Course</h1>
                        <div className="titles-wrapper">
                            {this.state.courses.map( e =>{
                                return ( <Item imageLink={this.props.imageFile[index++]} lecture={e} identity={identity} userData={userData}/>);
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

