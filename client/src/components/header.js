
import React from "react";
import logo from '../image/stonyflix_logo.png'
import Dropdown from "./dropdown";
let createClass = require('create-react-class');
////////////
// Header //
////////////

export let Header = createClass({
    render: function() {
        const userData = JSON.parse(sessionStorage.getItem('userData'))
        console.log(userData.image);
        return (
            <header className="Header">
                <Logo />
                <Navigation />
                <Search onSubmit={this.props.onSubmit} />
                <UserProfile user={userData.nickName} image={userData.image}/>
            </header>
        );
    }
});

// Logo
let Logo = createClass({
    render: function() {
        return (
            <a href='/content'>
                <div id="logo" className="Logo">
                    <img src={logo} alt=""/>
                </div>
            </a>
        );
    }
});

// Navigation
let Navigation = createClass({
    render: function() {
        return (
            <div id="navigation" className="Navigation">
                <nav>
                    <ul>
                        <li>Browse</li>
                        <li>MY COURSE</li>
                        {Dropdown()}
                    </ul>
                </nav>
            </div>
        );
    }
});

// Search
let Search = createClass({
    render: function() {
        return (
            <form onSubmit={this.props.onSubmit} id="search" className="Search">
                <input type="search" placeholder="Search for a title..." />
            </form>
        );
    }
});

// User Profile
let UserProfile = createClass({
    render: function() {
        return (
            <div className="UserProfile">
                <div className="User">
                    <div className="name">{this.props.user}</div>
                    <div className="image"><a href='/profile'><img src={this.props.image} alt=""/></a></div>
                </div>
                <div className="UserProfile-menu">
                    <div className="UserProfileSwitch">
                        <ul>
                            <li>
                                <div className="UserProfile-image">
                                    <img src="http://lorempixel.com/96/96" alt=""/>
                                </div>
                                <div className="UserProfile-name">
                                    Alexander
                                </div>
                            </li>
                            <li>
                                <div className="UserProfile-image">
                                    <img src="http://lorempixel.com/96/96" alt=""/>
                                </div>
                                <div className="UserProfile-name">
                                    Mattias
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="UserNavigation">
                        <ul>
                            <li>Your Account</li>
                            <li>Help Center</li>
                            <li>Sign out of Netflix</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
export default Header;