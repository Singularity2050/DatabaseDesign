
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

export const courseDetailInfoAPIMethod = (occupation,uid,success) =>{
    return fetch(`/api/courseDetail/${occupation}/${uid}`,{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const userInfoAPIMethod = (userInfo,success) =>{
    return fetch('/api/auth/google',{
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(userInfo),
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const findMyInfoAPIMethod = (occupation,uid,success)=>{
    return fetch(`/api/findMyData/${occupation}/${uid}`,{
        ...defaultHeaders,
    }).then(checkStatus)
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}
export const studentInfoAPIMethod = (id,success) =>{
    return fetch(`/api/auth/studentInfo?`+{id},{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const facultyInfoAPIMethod = (id,success) =>{
    return fetch(`/api/auth/facultyInfo?`+{id},{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const getCourseAPIMethod = (major,success) =>{
    return fetch(`/api/course/${major}`,{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}

export const deleteMyCourseAPI = (courseId,studentId,success) =>{
    return fetch('/api/deleteMyCourse/'+courseId+'/'+studentId,{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const addMyCourseAPI = (courseId,studentId,success) =>{
    return fetch('/api/addMyCourse/'+courseId+'/'+studentId,{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
export const deleteCourseAPI = (courseId,success) =>{
    return fetch(`/api/deleteCourse/${courseId}`,{
        ...defaultHeaders,
    }).then(checkStatus)
        .then(checkStatus)
        .then(parseJSON)
        .then(success);
}
//
// export const getDataAPIMethod = (success) => {
//     return fetch('/api/questions',{
//         ...defaultHeaders,
//     }).then(checkStatus)
//         .then(parseJSON)
//         .then(success);
// }
// export const deleteDataByIdAPIMethod = ( success) => {
//     return fetch(`/api/questions/`, {
//         ...defaultHeaders,
//         method: 'DELETE',
//     }).then(checkStatus)
//         .then(parseJSON)
//         .then(success);
// }
//
// export const createQuestionAPIMethod = (questions, success) => {
//     return fetch(`/api/questions`, {
//         ...defaultHeaders,
//         method: 'POST', // The method defaults to GET
//         body: JSON.stringify(questions),
//     }).then(checkStatus)
//         .then(parseJSON)
//         .then(success);
// }
//--------------------------------------------checking--------------------------------------------
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error: ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}