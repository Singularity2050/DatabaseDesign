import React from "react";
import $ from "jquery";
import {Route, Redirect, Switch} from 'react-router-dom';
import MainPage from './page/mainPage';
import Content from './page/contentPage';
import Profile from './page/profile';
import Courses from './page/courses';
import './css/ContentPage.css'

const NoMatch = ({location}) => (
    <div style={{textAlign:"center"}}>
        <h1>Error!</h1>You are trying to invalid access!
        <div>
            <code><br/>{location.pathname}
                <br/><br/> Please go Back to <a href="/" style={{color:"red"}}>MainPage</a>
            </code></div></div>);


/////////////////
/// COMPONENTS //
/////////////////

// Container
class App extends React.Component {

    constructor(props) {
        super(props);//
        this.getInitialState = this.getInitialState.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    getInitialState() {
        return {data: []};
    }

    performSearch(e) {
        // stop form from submitting
        e.preventDefault();
    }

    render() {

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        let allow = true;
        let noLogin = true;
        if(userData == null){
            noLogin = false;
        }else{
            if( userData.verified === undefined || userData.verified === false){
                allow = false;
            }
        }
            return (
                <Switch>
                    <Route path='/home' render={() => <MainPage message=""/>}/>

                    <Route path='/content' render={() =>
                        allow ? <Content function={this.performSearch}/>:<MainPage message=""/>
                    }/>
                    <Route path='/profile' render={() =>
                        noLogin ? <Profile function={this.performSearch}/>: <MainPage message=""/>
                    }/>
                    <Route path='/courses/:major' render={() =>
                        allow? <Courses/>:<MainPage message=""/>
                    }/>
                    <Route exact path='/' render={() => (<Redirect to='/home'/>)}/>
                    <Route component={NoMatch}/>
                </Switch>

            );
        }
    // }
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