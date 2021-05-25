// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';



////////////////
// Title List //
////////////////

// Title List Container
import React,{useState} from "react";
// import imageData from '../utils/image.json'



function TitleList(){
    const {data,setData}= useState([])
    const {mounted,setMounted} = useState(false);
    const {fLecture,setFLecture} = useState(JSON.parse(sessionStorage.getItem('fLecture')));
    const {sLecture,setSLecture} = useState(JSON.parse(sessionStorage.getItem('sLecture')));
    let titles = [];
    console.log(fLecture)
    // data.map((e) =>{fLecture.push(<Item image={e} link = {fLecture.lectureLink}/>)});
    return (
        <div className="TitleList" >
            <div className="Title">
                <h1>{fLecture === undefined ? sLecture: fLecture}</h1>
                <div className="titles-wrapper">
                    {titles}
                </div>
            </div>
        </div>
    );
};

// Title List Item
// function Item (data) {
//     const linkTo = () => {window.location.href = data.link;}
//     return (
//         <div className="Item" onClick={linkTo} style={{backgroundImage: 'url(' + data.image + ')'}} >
//             <a href={data.link}>
//                 <div className="overlay">
//                     <div className="title">{data.lectureCategory}</div>
//                     <div className="plot">{data.professor}</div>
//                     <div className="plot">{data.lectureDescription}</div>
//                     {/*<ListToggle />*/}
//                 </div>
//             </a>
//         </div>
//     );
// };

// ListToggle
// var ListToggle = createClass({
//     getInitialState: function() {
//         return({ toggled: false })
//     },
//     handleClick: function() {
//         if(this.state.toggled === true) {
//             this.setState({ toggled: false });
//         } else {
//             this.setState({ toggled: true });
//         }
//
//     },
//     render: function() {
//         return (
//             <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
//                 <div>
//                     <i className="fa fa-fw fa-plus"></i>
//                     <i className="fa fa-fw fa-check"></i>
//                 </div>
//             </div>
//         );
//     }
// });

export default TitleList;