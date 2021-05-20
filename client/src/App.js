import React from "react";
import $ from "jquery";
import {Route, Redirect, Switch} from 'react-router-dom';
import MainPage from './page/mainPage';
import Content from './page/contentPage';
import Profile from './page/profile';
import './css/ContentPage.css'
import Header from "./components/header";
import MainPost from "./components/mainPost"
import TitleList from "./components/titleList"

let createClass = require('create-react-class');

const NoMatch = ({location}) => (<div><strong>Error!</strong> No route found matching:<div><code>{location.pathname}</code></div></div>);


/////////////////
/// COMPONENTS //
/////////////////

// Container
class App extends React.Component {
    state = {user: this.props.user, lecture:this.props.lecture}

    constructor(props) {
        super(props);
        const apiKey = '87dfa1c669eea853da609d4968d294be';
        this.getInitialState = this.getInitialState.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    getInitialState() {
        return {data: []};
    }

    performSearch(e) {
        // stop form from submitting
        e.preventDefault();

        // get the value
        let val = $('.Search input').val();

        // Do the thing
        let requestUrl = 'https://api.themoviedb.org/3/search/multi?query=' + val + '&api_key=' + this.apiKey;

        $.ajax({
            url: requestUrl,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });}

    render() {
        if(sessionStorage.getItem('userData') == null){
            return (
                <Switch>
                    <Route path='/home' render={() => <MainPage message="Please Login !!"/>}/>

                    <Route path='/content' render={() => (
                        <Redirect to='/home'/>)
                    }/>
                    <Route path='/profile' render={() =>
                        (<Redirect to='/home'/>)
                    }/>
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route component={NoMatch}/>
                </Switch>

            );
        }else {
            return (
                <Switch>
                    <Route path='/home' render={() => <MainPage message=""/>}/>

                    <Route path='/content' render={() =>
                        <Content user={this.state.user} lecture={this.state.lecture} function={this.performSearch}/>
                    }/>
                    <Route path='/profile' render={() =>
                        <Profile user={this.state.user} function={this.performSearch}/>
                    }/>
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route component={NoMatch}/>
                </Switch>

            );
        }
    }
};


// class App extends React.Component{
//     state ={user:this.props.user}
//     constructor(props) {
//         super(props);
//     }
//
//     render() {return (
//         <Switch>
//             <Route path='/home' render={() => <MainPage/>}/>
//             <Route path='/content' render={() => <Content/>}/>
//             <Route path='/profile' render={() =>
//                 <Profile user={this.state.user} handler={this}/>
//             }/>
//             <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
//             <Route component={NoMatch}/>
//         </Switch>
//     );}}

export default App;
