import React,{ useState } from "react";
import {useMutate} from 'restful-react';
import defaultImage from '../image/default.png'
import '../css/Profile.css';
import {GoogleLogout} from "react-google-login";
import Header from "../components/header";

function Profile(userInfo){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const identity = JSON.parse(sessionStorage.getItem('identity'));
    let [name, setName] = useState(userData.name);
    let [nickName, setNickName] = useState(userData.nickName);
    let [occupation,setOccupation] = useState(userData.occupation);
    let [subData,setSubData] = useState(userData.occupation === 'Student'? identity.studentId: identity.office);
    let [major,setMajor] = useState(userData.major);
    let [selectedImage, setSelectedFile] = useState(userData.image);
    let [postImage, setPostImage] = useState(userData.image)
    //Image Upload
    const {mutate:uploadImage} = useMutate({
        verb:'POST',
        path:'/api/profileData'
    });
    //Faculty Courses
    // let fContainer = [];
    let fLectureData = JSON.parse(sessionStorage.getItem('identity'));
    // if(fLectureData.length>0){
    //     fLectureData.forEach(e =>{
    //         const oneCourse =[];
    //         oneCourse.push(e.cname);
    //         oneCourse.push(e.lectureDescription);
    //         oneCourse.push(e.lectureLink);
    //         oneCourse.push(e.id);
    //         fContainer.push(oneCourse);
    //     })
    // }


    let [faculty, setFaculty] = useState(fLectureData.Courses === undefined? []: fLectureData.Courses);
    //Student Lecture
    let sLecture = [''];
    sLecture = [JSON.parse(sessionStorage.getItem('sLecture'))];// data from session
    let [courseList,setCourseList] = useState(sLecture);


    let cNum = 0;
    let fNum = 0;
    let formData = new FormData();

    const handleNewCourse = (e) =>{
        e.preventDefault();
        const newCourseNum = parseInt(e.target.name);
        const newCourseType = parseInt(e.target.attributes.item(2).value);
        const newCourse = faculty[newCourseNum];
        console.log(e.target.attributes);
        if(newCourseType === 0){
            newCourse.cname = e.target.value;
        }else if( newCourseType === 1){
            newCourse.type = e.target.value;
        }else{
            newCourse.zoomLink = e.target.value;
        }
        newCourse.modified = true;
        newCourse.facultyId = fLectureData.id;
        setFaculty(
            [...faculty.slice(0,newCourseNum),newCourse,...faculty.slice(newCourseNum+1,faculty.length)]
        )
    }

    const addCourse = () =>{
        console.log(faculty);
        // const lastNum = faculty[faculty.length-1][3]
        setFaculty([...faculty,{'cname':"",'zoomLink':"",'type':""}])
        console.log(faculty)
    }
    const deleteCourse = () =>{
        const list = [];
        faculty.forEach( e =>{list.push(e)})
        list.pop();
        setFaculty(list)
    }
    const handleOccupation = (e) =>{
        setOccupation(e.target.value);
    }
    const handleCourses = (e) =>{
        const index = parseInt(e.target.name)
        setCourseList(
            [...courseList.slice(0,index),e.target.value,...courseList.slice(index+1,cNum)]
        )
    }
    const handleMajor = (e) =>{
        setMajor(e.target.value)
    }
    const handleNickName = (e) =>{
        setNickName(e.target.value);
    }
    const handleName =(e) =>{
        setName(e.target.value);
    }
    const handleSubData = (e) =>{
        setSubData(e.target.value);
    }
    const addMajorCourse = () =>{
        setCourseList([...courseList,''])
    }
    const deleteMajorCourse = () =>{
        const list = [];
        courseList.forEach( e =>{list.push(e)})
        list.pop();
        setCourseList(list)
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
    const handleUpload = async() =>{
        formData.append('occupation',occupation);
        formData.append('name',name);
        formData.append('nickName',nickName);
        formData.append('subData',subData);
        formData.append('major',major);
        formData.append('userId',userData.id)
        formData.append('image',postImage);
        if(occupation ==='Faculty'){
            formData.append('newCourse',JSON.stringify(faculty))
        }
        const sessionData = await uploadImage(formData).catch( r =>{ console.error('error :' + r)})

        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('identity')
        console.log(sessionData);
        sessionStorage.setItem('userData',JSON.stringify(sessionData[0]));
        sessionStorage.setItem('identity',JSON.stringify(sessionData[1]));
        document.getElementById('profilePageImage').src = selectedImage;
        //Notice user data is saved
        let hi = document.createTextNode("    ...              Saved!!");
        document.getElementById('studentMode').appendChild(hi);
        //move
        let moveTo;
        setTimeout( moveTo = () =>window.location.href = '/content',1000);
    }


    return(
        <div className="wrapper">
            <Header user={userInfo.user} onSubmit={userInfo.performSearch} />
            <br/><br/><br/><br/><br/><br/><br/>
            <article id='profileArticle'>
                <h2>Edit Profile</h2>
                <section>
                    <div className="box" >
                        <h3>Profile photo</h3>
                        <div id ='profileBox1'>
                            <img src={selectedImage} id="profilePageImage" alt="none"/>
                            <label for="inputBox">Choose new image</label>
                            <input type="file" id="inputBox" onChange={handleChange} accept="image/png, image/jpeg, .jpg, .png"/>
                            <div id="removeImage"  onClick={deleteImage}>Remove image</div>
                        </div>
                    </div>
                </section>
                <br/>
                <section>
                    <div className="box" >
                        <h3>Occupation</h3>
                        {userData.verified?
                            <>
                                <h3>{userData.occupation}</h3>
                            </>
                            :
                            <select name='occupation' onChange={handleOccupation} className='generalInfo' value={occupation} required>
                                <option value='Student'>Student</option>
                                <option value='Faculty'>Faculty</option>
                            </select>
                        }

                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>{occupation === 'Student'? 'StudentId':'Office'} </h3>
                        <input type={occupation === 'Student'? 'number':'text'} className='generalInfo' id="profileName" onChange={handleSubData} value={subData} required/>
                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>Name</h3>
                        <input type="text" className='generalInfo' id="profileName" onChange={handleName} value={name} required="true"/>
                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>NickName</h3>
                        <input type="text" className='generalInfo' id="profileName" onChange={handleNickName} value={nickName} required="true"/>
                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>Major</h3>
                        <select name='course' onChange={handleMajor} className='generalInfo' value={major}>
                            <option value="">Please Choose your Major</option>
                            <option value='CSE'>CSE</option>
                            <option value='MEC'>MEC</option>
                            <option value='AMS'>AMS</option>
                            <option value='TSM'>TSM</option>
                            <option value='FIT'>FIT</option>
                        </select>
                    </div>
                    <br/>
                </section>
                <section>
                    <div className="box" >
                        <h3>My Courses</h3>
                    </div>
                    <br/>
                </section>
                {userData.occupation === "Faculty" ?
                    <>
                        <section>
                            <div>
                                {faculty.map(e =>
                                    <>
                                        <h1 id='facultyFont'> Fauculty: Course</h1>
                                        <input type='text' name={fNum} flag='0' className='facultyCourse' placeholder='Course Name' value={e.cname} onChange={handleNewCourse}/><br/>
                                        <select type='course' name={fNum} flag='1' onChange={handleNewCourse} className='facultyCourse' value={e.type} >
                                            <option value="">Please Choose Lecture Type</option>
                                            <option value='CSE'>CSE</option>
                                            <option value='MEC'>MEC</option>
                                            <option value='AMS'>AMS</option>
                                            <option value='TSM'>TSM</option>
                                            <option value='FIT'>FIT</option>
                                        </select><br/>
                                        <input type='text' name={fNum++} flag='2' className='facultyCourse' placeholder='Course Link'value={e.zoomLink} onChange={handleNewCourse}/>
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
                    </>
                    :
                    <>
                    </>
                }
                <input type="submit" id="submitbtn" onClick={handleUpload} value="Save"/>
                <p id='studentMode'></p>
                <GoogleLogout
                    clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
                    buttonText="Logout"
                    className="logout"
                    onLogoutSuccess={logout}
                />
            </article>
        </div>
    )
}
export default Profile;