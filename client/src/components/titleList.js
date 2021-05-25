
////////////////
// Title List //
////////////////

// Title List Container
import React from "react";
import imageData from '../utils/image.json'

var createClass = require('create-react-class');

export var TitleList = createClass({

    apiKey: '87dfa1c669eea853da609d4968d294be',
    getInitialState: function() {
        return {data: imageData.cse, mounted: false, lectureData:[]};
    },
    loadContent: function() {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        if(user.occupation === 'Faculty'){
            const flec = JSON.parse(sessionStorage.getItem('fLecture'));
            this.setState({lectureData: flec})
        }else{
            const slec = JSON.parse(sessionStorage.getItem('sLecture'));
            this.setState({lectureData:slec})
        }
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
        console.log( this.state.lectureData);
        return (
            <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
                <div className="Title">
                    <h1>{this.props.title}</h1>
                    <div className="titles-wrapper">
                        {this.state.lectureData.map( (e) => {
                          return ( <Item imageLink={this.state.data[index++]} lecture={e} />);
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

// Title List Item
function Item(e){

    console.log(e);
        return (
            <div className="Item"  style={{backgroundImage: 'url(' + e.imageLink + ')'}} >
                <a href={e.lecture.lectureLink} target='_blank'>
                    <div className="overlay">
                        <div className="title">{e.lecture.lectureName}</div>
                        {/*<div className="rating">{this.props.score} / 10</div>*/}
                        <div className="plot">{e.lecture.professor}</div>
                        <div className="plot">{e.lecture.lectureDescription}</div>
                        <ListToggle />
                    </div>
                </a>
            </div>
        );
};

// ListToggle
var ListToggle = createClass({
    getInitialState: function() {
        return({ toggled: false })
    },
    handleClick: function() {
        if(this.state.toggled === true) {
            this.setState({ toggled: false });
        } else {
            this.setState({ toggled: true });
        }

    },
    render: function() {
        return (
            <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
                <div>
                    <i className="fa fa-fw fa-plus"></i>
                    <i className="fa fa-fw fa-check"></i>
                </div>
            </div>
        );
    }
});

export default TitleList;
