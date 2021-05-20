
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
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