import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import 'typeface-roboto';
import ImageViewer from "./ImageViewer";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <ImageViewer/>
    </Router>,
    document.getElementById('root')
);
