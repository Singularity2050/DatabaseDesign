import React,{ useState } from "react";
import {useMutate} from 'restful-react';
import defaultImage from '../image/default.png'
import '../css/Profile.css';
import {GoogleLogout} from "react-google-login";
import Header from "../components/header";

function Profile(userInfo){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    let [nickName, setNickName] = useState(userData.nickName);
    let [major,setMajor] = useState(userData.major);
    let [selectedImage, setSelectedFile] = useState(userData.image);
    let [postImage, setPostImage] = useState(userData.image)
    let fLectureData = JSON.parse(sessionStorage.getItem('fLecture'));
    let fcontainer = [];
    if(fLectureData.length>0){
        fLectureData.forEach(e =>{
            const oneCourse =[];
            oneCourse.push(e.lectureName);
            oneCourse.push(e.lectureDescription);
            oneCourse.push(e.lectureLink);
            oneCourse.push(e.id);
            fcontainer.push(oneCourse);
        })
    }else{
        console.log('hi');
        fcontainer.push(['','','',1]);
    }
    let mContainer = [];
    let eContainer = [];
    let sLecture = [''];
    sLecture = [JSON.parse(sessionStorage.getItem('sLecture'))];
    console.log(sLecture);
    sLecture.forEach( e =>{
        e.type == "Major" ? mContainer.push(e.lectureName): eContainer.push(e.lectureName);
    })
    let [majorCourseList,setMajorCourseList] = useState(mContainer);
    let [electiveCourseList, setElectiveCourseList] = useState(eContainer);
    let [faculty, setFaculty] = useState(fcontainer);
    let eNum = 0;
    let mNum = 0;
    let cNum = 0;
    let formData = new FormData();
    const {mutate:uploadImage} = useMutate({
        verb:'POST',
        path:'/api/profileData'
    });
    const handleNewCourse = (e) =>{
        e.preventDefault();
        const newCourseNum = parseInt(e.target.name);
        const newCourseType = parseInt(e.target.attributes.item(2).value);
        const newCourse = faculty[newCourseNum];
        newCourse[newCourseType] = e.target.value;
        setFaculty(
            [...faculty.slice(0,newCourseNum),newCourse,...faculty.slice(newCourseNum+1,faculty.length)]
        )
    }

    const addCourse = () =>{
        console.log(faculty);
        const lastNum = faculty[faculty.length-1][3]
        setFaculty([...faculty,['','','',lastNum+1]])
        console.log(faculty)
    }
    const deleteCourse = () =>{
        const list = [];
        faculty.forEach( e =>{list.push(e)})
        list.pop();
        setFaculty(list)
    }
    const handleElectiveCourse = (e) =>{
        const index = parseInt(e.target.name)
        setElectiveCourseList(
            [...electiveCourseList.slice(0,index),e.target.value,...electiveCourseList.slice(index+1,eNum)]
        )
    }
    const handleMajorCourse = (e) =>{
        const index = parseInt(e.target.name)
        setMajorCourseList(
            [...majorCourseList.slice(0,index),e.target.value,...majorCourseList.slice(index+1,mNum)]
        )
    }
    const handleMajor = (e) =>{
        setMajor(e.target.value)
    }
    const handleNickName =(e) =>{
        setNickName(e.target.value);
    }
    const addMajorCourse = () =>{
        setMajorCourseList([...majorCourseList,''])
    }
    const deleteMajorCourse = () =>{
        const list = [];
        majorCourseList.forEach( e =>{list.push(e)})
        list.pop();
        setMajorCourseList(list)
    }
    const addElectiveCourse = () =>{
        const list = [];
        electiveCourseList.forEach( e =>{list.push(e)})
        setElectiveCourseList([...list,''])
        console.log(electiveCourseList)
    }
    const deleteElectiveCourse = () =>{
        const list = [];
        electiveCourseList.forEach( e =>{list.push(e)})
        list.pop();
        console.log(list);
        setElectiveCourseList(list)
        console.log(electiveCourseList)
    }
    const logout = (res) =>{
        sessionStorage.clear();
        window.location.href="/"
    }

    const handleChange = (e) =>{
        setPostImage(e.target.files[0])
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () =>{
            setSelectedFile(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const deleteImage = (e) =>{
        setSelectedFile(defaultImage);
        setPostImage(defaultImage);
        console.log(defaultImage);
    }
    const handleUpload = () =>{
        let sessionData;
        formData.append('userId',userData.id)
        formData.append('mode',userData.occupation)
        formData.append('nickName',nickName);
        formData.append('electiveCourse',JSON.stringify(electiveCourseList));
        formData.append('majorCourse',JSON.stringify(majorCourseList));
        formData.append('major',major);
        formData.append('image',postImage);
        uploadImage(formData)
            .then(r =>{sessionData = r; console.log(sessionData);})
            .catch( () =>{console.log('Oooops, there is something wrong')})
        document.getElementById('profilePageImage').src = selectedImage;
        //Notice user data is saved
        let hi = document.createTextNode("    ...              Saved!!");
        document.getElementById('studentMode').appendChild(hi);
        //remove notice
        let removeText = document.getElementById('studentMode').childNodes[0];
        setTimeout(function(){removeText.remove()},1000);
    }
    const handleFacultyModeUpload = () =>{
        formData.append('userId',userData.id)
        formData.append('mode',userData.occupation)
        formData.append('nickName',nickName);
        formData.append('major',major);
        formData.append('image',postImage);
        formData.append('newCourse',JSON.stringify(faculty))
        uploadImage(formData)
            .then(r =>{ console.log(r); sessionStorage.setItem('fLecture',JSON.stringify(r[0])); sessionStorage.setItem('userData',JSON.stringify(r[1])); })
            .catch( () =>{console.log('Oooops, there is something wrong')})
        document.getElementById('profilePageImage').src = selectedImage;
        //Notice user data is saved
        let hi = document.createTextNode("    ...              Saved!!");
        document.getElementById('facultyModeSubmit').appendChild(hi);
        //remove notice
        let removeText = document.getElementById('facultyModeSubmit').childNodes[0];
        setTimeout(function(){removeText.remove()},1000);
    }

    return(
        <div className="wrapper">
            <Header user={userInfo.user} onSubmit={userInfo.performSearch} />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <article id='profileArticle'>
                <h2>Edit Profile</h2>
                <section>
                    <div className="box" >
                        <h3>Profile photo</h3>
                        <div id ='profileBox1'>
                            <img src={selectedImage} id="profilePageImage" alt="none"/>
                            <label for="inputBox">Choose new image</label>
                            <input type="file" id="inputBox" onChange={handleChange} accept="image/png, image/jpeg, .jpg, .png"/>
                            <a id="removeImage" onClick={deleteImage}>Remove image</a>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="box" >
                        <h3>NicKName</h3>
                        <input type="text" className="longtext" className='generalInfo' id="profileName" onChange={handleNickName} value={nickName} required/>
                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>MAJOR</h3>
                        <select name='major' onChange={handleMajor} className='generalInfo' value={major}>
                            <option value=''>Choose Your Major</option>
                            <option value='CSE'>CSE</option>
                            <option value='MEC'>MEC</option>
                            <option value='AMS'>AMS</option>
                            <option value='TSM'>TSM</option>
                            <option value='FIT'>FIT</option>
                        </select>
                    </div>
                    <br/>
                </section>
                {userData.occupation == "Faculty" ?
                    <>
                        <section>

                            <div>
                                {faculty.map(e =>
                                    <>
                                        <h1 id='facultyFont'> Fauculty: Course</h1>
                                        <input type='text' name={cNum} flag='0' className='facultyCourse' placeholder='Course Name' value={e[0]} onChange={handleNewCourse}/><br/>
                                        <input type='text' name={cNum} flag='1'className='facultyCourse' placeholder='Course Description' value={e[1]} onChange={handleNewCourse} /><br/>
                                        <input type='text' name={cNum++} flag='2' className='facultyCourse' placeholder='Course Link'value={e[2]} onChange={handleNewCourse}/>
                                    </>
                                )}
                                <div id="plus">
                                    <button className="material-icons" onClick={addCourse}>add</button>
                                    <button className="material-icons" onClick={deleteCourse}>delete</button>
                                </div>
                            </div>
                            <br/>
                        </section>
                        <br/>
                        <div id="btn">
                            <input type="submit" id="submitbtn" onClick={handleFacultyModeUpload} value="Save"/>
                            <p id='facultyModeSubmit'></p>
                            <br/>
                            <br/>
                            <div>
                                <GoogleLogout
                                    clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    className="logout"
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <section>
                            <div className="box">
                                <h3>MAJOR COURSE</h3>
                                {majorCourseList.map(e =>
                                    < input
                                        type="text"
                                        name={mNum++}
                                        className="longtext"
                                        id="majorCourse1"
                                        onChange={handleMajorCourse}
                                        value={e}
                                    />
                                )}
                                <div id="plus">
                                    <button className="material-icons" onClick={addMajorCourse}>add</button>
                                    <button className="material-icons" onClick={deleteMajorCourse}>delete</button>
                                </div>
                            </div>
                            <br/>
                            <div className="box">
                                <h3>ELECTIVE COURSE</h3>
                                {electiveCourseList.map(e =>
                                    <input
                                        type="text"
                                        className="longtext"
                                        name={eNum++}
                                        id="electiveCourse1"
                                        onChange={handleElectiveCourse}
                                        value={e}
                                    />
                                )}
                                <div id="plus">
                                    <button className="material-icons" onClick={addElectiveCourse}>add</button>
                                    <button className="material-icons" onClick={deleteElectiveCourse}>delete</button>
                                </div>
                            </div>
                            <br/>
                        </section>

                        <br/>
                        <div id="btn">
                            <input type="submit" id="submitbtn" onClick={handleUpload} value="Save"/>
                            <p id='studentMode'></p>
                            <br/>
                            <br/>
                            <div>
                                <GoogleLogout
                                    clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    className="logout"
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout>
                            </div>
                        </div>
                    </>
                }
            </article>
        </div>
    )
}
export default Profile;