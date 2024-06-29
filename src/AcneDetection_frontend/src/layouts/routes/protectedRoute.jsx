import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getSessionExpired from '../../helpers/getSessionExpired';
import Loaded from "../../component/Loaded/Loaded"

const ProtectedRoute = () => {


    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuth = () => {
            const isAuth = getSessionExpired();
            setIsAuthenticated(isAuth);
            setLoading(false);
            
        };
        checkAuth();
    }, []);

   
    if (loading) {
        return <Loaded />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
