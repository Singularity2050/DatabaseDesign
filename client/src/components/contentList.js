
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
    }

    render() {
        const isEmpty = this.state.courses.length <= 0;
        if(this.state.courses.length<= 0){
                getCourseAPIMethod(this.props.major).then( r =>{
                    this.setState({'courses':r})
                });
        }
        // const courses = this.state;
        // const obj = JSON.parse(courses);
        let index = 0;
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const identity = JSON.parse(sessionStorage.getItem('identity'));
        console.log(isEmpty);
        return(
            <>
                <div  className="TitleList">
                    <div className="Title">
                        <h1>{this.props.major} Course</h1>
                        <div className="titles-wrapper">
                            {isEmpty ? <></> :
                                    this.state.courses.map(e => {
                                        console.log(e);
                                        return (<Item imageLink={this.props.imageFile[index++]} lecture={e}
                                                      identity={identity} userData={userData}/>);
                                    })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

