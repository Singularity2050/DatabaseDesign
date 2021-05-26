
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
                    <div className="button-wrapper">
                        <HeroButton primary={true} text="Watch now" link="https://blackboard.stonybrook.edu"/>
                        <HeroButton primary={false} text="My list" />
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
export default Hero;