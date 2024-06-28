import React, { useEffect, useState } from "react";
import './Login.css';
import loginImg from "../../../assets/image/acneimg.jpg";
import Button from "../../component/Button/Button";
import handleLogin from "./partials/handleLogin";
import initAuthClient from "../../actorBackend/initAuthClient";
import { useNavigate } from "react-router-dom";
import { Principal } from '@dfinity/principal';
import getDataSession from "../../helpers/getDataSession";


function Login() {
    const [authClient, setAuthClient] = useState(null);
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const ANONYMOUS_PRINCIPAL = "2vxsx-fae";

    const { user } = getDataSession();


    useEffect(() => {
        const initAuth = async () => {
            const { authClient, actor } = await initAuthClient();
            setAuthClient(authClient);
            setActor(actor);

            console.log("user di login", user);

            if (user && user !== ANONYMOUS_PRINCIPAL) {
                console.log("masuk sini");
                const principal = Principal.fromText(user);
                const check_user = await actor.read_user_by_id(principal);
                if (check_user[0]!== null || check_user.length !== 0) {
                    setIsAuthenticated(true);
                    navigate('/home')
                }
                
            }

            setLoading(false);

        };

        initAuth();
    }, []);

    const btnLogin = async () => {
        await handleLogin(authClient, actor, navigate);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

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
                <Button primary className="rounded-full" onClick={btnLogin}>
                    Login Internet Identity
                </Button>
                <button></button>
            </div>
        </div>
    );

};

export default Login;