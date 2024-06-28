import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getSessionExpired from '../../helpers/getSessionExpired';

const ProtectedRoute = () => {


    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuth = () => {
            const isAuth = getSessionExpired();
            setIsAuthenticated(isAuth);
            setLoading(false);
            console.log("Protedted Route: ", isAuth);
            
        };
        checkAuth();
    }, []);

   
    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
