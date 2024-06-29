import React from "react";
import './ErrorPage.css';
import errorImg from "../../../assets/image/errorImage.png";
import Button from "../../component/Button/Button";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className='container-error'>
            <div className='left-content'>
                <h1>Uppss... Page Not Found.</h1>
                <h1 className="text-red-800">It's a 404 Error!</h1>
                <h1>Don't Worry Be Happy.</h1>
                <h1>Stay Cool Bestie...</h1>
                <div className="mt-10">
                    <Button 
                        secondary
                        className="rounded-full  w-60 max-w-full" 
                        onClick={() => navigate('/home')}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
            <div className='right-content'>
                <img src={errorImg} alt="Error" />
            </div>
        </div>
    );
}

export default ErrorPage;
