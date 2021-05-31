import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './Testing/reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import defaultImage from "./image/default.png";


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
