import React from "react";
import './ErrorPage.css';
import errorImg from "../../../assets/image/errorImage.png";

const ErrorPage = () => {
    return(
        <div className='container-error'>
            <div className='left-content'>
                <h1>Uppss... Page Not Found.</h1>
                <h1 className="text-red-800">It's a 404 Error!</h1>
                <h1>Don't Worry Be Happy.</h1>
                <h1>Stay Cool Bestie...</h1>
            </div>
            <div className='right-content'>
                <img src={errorImg} alt="Image" />
            </div>
        </div>
    );
}

export default ErrorPage;