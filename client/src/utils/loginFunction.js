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
export const responseGoogle = (response) => {
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
