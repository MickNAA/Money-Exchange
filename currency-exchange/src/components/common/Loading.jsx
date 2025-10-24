import React from "react";
import '../../styles/components/Loading.css'

const Loading = ({message = 'Loading...'}) => {
    return(
        <div className="Loading-container">
            <div className="spinner">spinner</div>
            <p className="loading-text">{message}</p>
        </div>
    );
};
export default Loading;