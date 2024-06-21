import React from "react";
import  './Login.css';
import loginImg from "../../../assets/image/acneimg.jpg";
import Button from "../../component/Button/Button";


function Login () {
    return (
       <div className='container-login'>
        <div className='left-content'>
            <img src={loginImg} alt="Image" />
        </div>
        <div className='right-content'>
            <h1>"Smart Acne Detection"</h1>
            <h2>Simple, Easy, and From Home</h2>
            <p>Discover our cutting-edge web application
                designed to help you easily identify different
                types of acne from the comfort of your home.
            </p>
            <Button  className='' primary>
                Start Detection
            </Button>
            <button></button>
        </div>
       </div>
    );
  
};

export default Login;