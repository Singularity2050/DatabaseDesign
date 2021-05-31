import {userInfoAPIMethod} from "../api/client";

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

export const responseGoogle = async (response) => {
    document.getElementById('googleLogin').style= 'display:none'
    document.getElementById('googleHide').style ='display:block'
    console.log(response.profileObj);
    const userData = await userInfoAPIMethod(response.profileObj);
    console.log(userData);
    sessionStorage.setItem('userData', JSON.stringify(userData[0]))
    if(userData[1]){
        sessionStorage.setItem('identity',JSON.stringify(userData[1]))
    }else{
        sessionStorage.setItem('identity',JSON.stringify({studentId:null, office:null}))
    }
    if(userData[0].verified){
        sessionStorage.setItem('fLecture',JSON.stringify([]))
        sessionStorage.setItem('sLecture',JSON.stringify(slec))
        window.location.href = '/content'
    }else{
        sessionStorage.setItem('fLecture',JSON.stringify([]))
        sessionStorage.setItem('sLecture',JSON.stringify(slec))
        window.location.href = '/profile'
    }
    //     console.log(r)

    //     // console.log(r[1] === "")
    //     console.log(r);

    // })
}
