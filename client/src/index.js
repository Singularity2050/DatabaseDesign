import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './Testing/reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import defaultImage from "./image/default.png";

let user=[];
let lecture=[];
user = {
    ElectiveCourseList : ['HIS104',"BIO302"],
    MajorCourseList:['cse301','cse302'],
    nickName:'sije',
    major:'CSE',
    image:defaultImage
}
lecture = {
    lectureCategory: "CSE",
    lectureName: [{no:0, name:'cse301'},{no:1,name:'cse302'}],
    lectureDescription:['database'],
    lectureLink:['database'],
    professor:"ArtLee"
}
ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App user={user} lecture={lecture}/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
