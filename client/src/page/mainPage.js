import React, {useState} from 'react';
import '../css/Home.css';
import {GoogleLogin, GoogleLogout }from 'react-google-login';
import { userInfoAPIMethod} from "../api/client"
import logo from '../image/stonyflix_logo.png'
function Main(props) {
    const [tab1Show, setTab1Show] = useState('tab-content-item show');
    const [tab2Show, setTab2Show] = useState('tab-content-item');
    const [tab3Show, setTab3Show] = useState('tab-content-item');
    const [tab1Border, setTab1Border] = useState('tab-item tab-border');
    const [tab2Border, setTab2Border] = useState('tab-item');
    const [tab3Border, setTab3Border] = useState('tab-item');

    const responseGoogle = (response) => {
        document.getElementById('googleLogin').style= 'display:none'
        document.getElementById('googleHide').style ='display:block'
        userInfoAPIMethod(response.profileObj).then(r => {
            console.log(r)
            const slec = [{
                lectureCategory: "",
                lectureDescription: "",
                lectureLink: "",
                lectureName: "",
                professor: "",
                type: "",
                }]
            const flec = [{
                lectureCategory: "",
                lectureDescription: "",
                lectureLink: "",
                lectureName: "",
                professor: ""
            }]
            console.log(r[1] === "")
            sessionStorage.setItem('userData', JSON.stringify(r[0]))
            sessionStorage.setItem('fLecture',JSON.stringify(r[1] === "" ? flec : r[1]))
            sessionStorage.setItem('sLecture',JSON.stringify(r[2] === ""? slec: r[2]))
        })
    }
    const responseFailGoogle = (r) =>{
        loginStatus("Login Failed");
    }
    const loginStatus = () =>{
        const statusText = document.getElementById('failure');
        statusText.innerText =props.message;
        const removeText =statusText.childNodes[0];
        setTimeout(function(){removeText.remove()},2000);
    }

    const logout = (res) =>{
        document.getElementById('googleLogin').style= 'display:block'
        document.getElementById('googleHide').style ='display:none'
        sessionStorage.clear();
    }
// Select tab content item
    const selectItem = (e) => {
        // Grab content item from DOM

        const tapContentItemName = String(e.target.id).concat('-content show');
        if (e.currentTarget.id === 'tab-1') {
            tab1(tapContentItemName)
        } else if (e.currentTarget.id === 'tab-2') {
            tab2(tapContentItemName)
        } else {
            tab3(tapContentItemName)
        }
    }

//
    const tab1 = (tapContentItemName) =>{
        setTab1Show(tapContentItemName)
        setTab2Show('tab-content-item')
        setTab3Show('tab-content-item')
        setTab1Border('tab-item tab-border')
        setTab2Border('tab-item')
        setTab3Border('tab-item')
    }
    const tab2 = (tapContentItemName) =>{
        setTab1Show('tab-content-item')
        setTab2Show(tapContentItemName)
        setTab3Show('tab-content-item')
        setTab1Border('tab-item')
        setTab2Border('tab-item tab-border')
        setTab3Border('tab-item')
    }
    const tab3 = (tapContentItemName) =>{
        setTab1Show('tab-content-item')
        setTab2Show('tab-content-item')
        setTab3Show(tapContentItemName)
        setTab1Border('tab-item')
        setTab2Border('tab-item')
        setTab3Border('tab-item tab-border')
    }

    return(
        <div className="App">
            <header className="showcase">
                <div className="showcase-top">
                    <img src={logo}/>
                </div>
                <div className="showcase-content">
                    <h1>See what's next Assignment</h1>
                    <p>Watch lecture anywhere.<br/> Drop Anytime</p>
                    <a href="/content" onClick={loginStatus} className="btn btn-xl">Watch For 4 Year <i className="fas fa-chevron-right btn-icon"></i></a>
                </div>
                <div className="showcase-top">
                    <div id='googleLogin'>
                        <GoogleLogin
                            clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseFailGoogle}
                            cookiePolicy={'single_host_origin'}
                            className='login'
                            isSignedIn={true}
                        />
                    </div>
                    <div id='googleHide'>
                        <GoogleLogout
                            clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
                            buttonText="Logout"
                            style="display:none"
                            className="logout"
                            onLogoutSuccess={logout}
                        >
                        </GoogleLogout>
                    </div>
                    <p id='failure'></p>
                </div>
            </header>
            <section className="tabs">
                <div className="container">
                    <div id="tab-1" className={tab1Border} onClick={selectItem}>
                        <i className="fas fa-door-open fa-3x"></i>
                        <p className="hide-sm">Drop College Any Time</p>
                    </div>
                    <div id="tab-2" className={tab2Border} onClick={selectItem}>
                        <i className="fas fa-tablet-alt fa-3x"></i>
                        <p className="hide-sm">Watch Lecture Anywhere</p>
                    </div>
                    <div id="tab-3" className={tab3Border} onClick={selectItem}>
                        <i className="fas fa-tags fa-3x"></i>
                        <p className="hide-sm">Pick your Assignment</p>
                    </div>
                </div>
            </section>
            {/*Tab Content 1*/}
            <section className="tab-content">
                <div className="container">
                    <div id="tab-1-content" className={tab1Show}>
                        <div className="tab-1-content-inner">
                            <div>
                                <p className="text-lg">
                                    If you decide Netflix isn't for you - no problem. No commitment.
                                    Cancel online anytime.
                                </p>
                                <a href="/content" className="btn btn-lg">Watch Free For 30 Days</a>
                            </div>
                            <img src="https://i.ibb.co/J2xDJV7/tab-content-1.png" alt=""/>
                        </div>
                    </div>

                    {/*Tab Content 2 */}
                    <div id="tab-2-content" className={tab2Show}>
                        <div className="tab-2-content-top">
                            <p className="text-lg">
                                Watch TV shows and movies anytime, anywhere — personalized for
                                you.
                            </p>
                            <a href="/" className="btn btn-lg">Watch Free For 30 Days</a>
                        </div>
                        <div className="tab-2-content-bottom">
                            <div>
                                <img src="https://i.ibb.co/DpdN7Gn/tab-content-2-1.png" alt=""/>
                                <p className="text-md">
                                    Watch on your TV
                                </p>
                                <p className="text-dark">
                                    Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
                                    players and more.
                                </p>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/R3r1SPX/tab-content-2-2.png" alt=""/>
                                <p className="text-md">
                                    Watch instantly or download for later
                                </p>
                                <p className="text-dark">
                                    Available on phone and tablet, wherever you go.
                                </p>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/gDhnwWn/tab-content-2-3.png" alt=""/>
                                <p className="text-md">
                                    Use any computer
                                </p>
                                <p className="text-dark">
                                    Watch right on Netflix.com.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*Tab Content 3 */}
                    <div id="tab-3-content" className={tab3Show}>
                        <div className="text-center">
                            <p className="text-lg">
                                Choose one plan and watch everything on Netflix.
                            </p>
                            <a href="/" className="btn btn-lg">Watch Free For One Semester</a>
                        </div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Basic</th>
                                <th>Standard</th>
                                <th>Premium</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Monthly price after free month ends on 6/19/19</td>
                                <td>$8.99</td>
                                <td>$12.99</td>
                                <td>$15.99</td>
                            </tr>
                            <tr>
                                <td>HD Available</td>
                                <td><i className="fas fa-times"></i></td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            <tr>
                                <td>Ultra HD Available</td>
                                <td><i className="fas fa-times"></i></td>
                                <td><i className="fas fa-times"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            <tr>
                                <td>Screens you can watch on at the same time</td>
                                <td>1</td>
                                <td>2</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Watch on your laptop, TV, phone and tablet</td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            <tr>
                                <td>Unlimited movies and TV shows</td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            <tr>
                                <td>Cancel anytime</td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            <tr>
                                <td>First month free</td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                                <td><i className="fas fa-check"></i></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>Questions? Call 1-866-579-7172</p>
                <div className="footer-cols">
                    <ul>
                        <li><a href="/">FAQ</a></li>
                        <li><a href="/">Investor Relations</a></li>
                        <li><a href="/">Ways To Watch</a></li>
                        <li><a href="/">Corporate Information</a></li>
                        <li><a href="/">Netflix Originals</a></li>
                    </ul>
                    <ul>
                        <li><a href="/">Help Center</a></li>
                        <li><a href="/">Jobs</a></li>
                        <li><a href="/">Terms Of Use</a></li>
                        <li><a href="/">Contact Us</a></li>
                    </ul>
                    <ul>
                        <li><a href="/">Account</a></li>
                        <li><a href="/">Redeem Gift Cards</a></li>
                        <li><a href="/">Privacy</a></li>
                        <li><a href="/">Speed Test</a></li>
                    </ul>
                    <ul>
                        <li><a href="/">Media Center</a></li>
                        <li><a href="/">Buy Gift Cards</a></li>
                        <li><a href="/">Cookie Preferences</a></li>
                        <li><a href="/">Legal Notices</a></li>
                    </ul>
                </div>

            </footer>
        </div>
    );
}
export default Main;