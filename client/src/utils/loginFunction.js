import {findMyInfoAPIMethod, userInfoAPIMethod} from "../api/client";

export const logout = (res) =>{
    document.getElementById('googleLogin').style= 'display:block'
    document.getElementById('googleHide').style ='display:none'
    sessionStorage.clear();
}

export const loginStatus = () =>{
    const statusText = document.getElementById('failure');
    statusText.innerText ="Login Failed";
    const removeText =statusText.childNodes[0];
    setTimeout(function(){removeText.remove()},2000);
}

export const responseFailGoogle = (r) =>{
    loginStatus("Login Failed");
}
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

export const getUserData = async() =>{

}
export const responseGoogle = async (response) => {
    document.getElementById('googleLogin').style= 'display:none'
    document.getElementById('googleHide').style ='display:block'
    console.log(response.profileObj);
    const userData = await userInfoAPIMethod(response.profileObj);
    console.log(userData);
    sessionStorage.setItem('userData', JSON.stringify(userData[0]))

    if(userData[1]){
        let identity = await findMyInfoAPIMethod(userData[0].occupation,userData[0].id)
        sessionStorage.setItem('identity',JSON.stringify(identity))
        sessionStorage.setItem('courseDetail',JSON.stringify(userData[1]))
    }else{
        const myInfo = {studentId:null, office:null};
        const firstData = {myInfo}
        sessionStorage.setItem('identity',JSON.stringify({myInfo}));
    }
    if(userData[0].verified){
        window.location.href = '/content'
    }else{
        window.location.href = '/profile'
    }
    //     console.log(r)

    //     // console.log(r[1] === "")
    //     console.log(r);

    // })
}
