
//////////
// Hero //
//////////

import React from "react";

let createClass = require('create-react-class');

let Hero = createClass({
    render: function() {
        return (
            <div id="hero" className="Hero" style={{backgroundImage: 'url(https://you.stonybrook.edu/academictechnologyservices/files/2018/01/featured-blackboard-updates-1x51l90.png)'}}>
                <div className="content">
                    <h1 id="mainPostTitle">2021 Fall <span id='RedText'>BlackBoard</span></h1>
                    <h2> Fall Semester now available</h2>
                    <p>STONYFLIX Is Opening!! </p>
                    <div className="button-wrapper">
                        <HeroButton primary={true} text="Go to Blackboard" link="https://blackboard.stonybrook.edu"/>
                        <HeroButton2 primary={false} text="My list" link="#myList"/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
})

// Hero Button
let HeroButton = createClass({
    render: function() {
        return (
            <a href={this.props.link} rel="noopener noreferrer" target='_blank' className="Button" data-primary={this.props.primary}>{this.props.text}</a>
        );
    }
})
let HeroButton2 = createClass({
    render: function() {
        return (
            <a href={this.props.link} rel="noopener noreferrer" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
        );
    }
})
export default Hero;