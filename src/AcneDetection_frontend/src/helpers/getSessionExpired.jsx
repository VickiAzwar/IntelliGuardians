import React from 'react';

const ANONYMOUS_PRINCIPAL = "2vxsx-fae";
    
const getSessionExpired = () => {

    const session = localStorage.getItem('session');

    if (!session) {
        return false;
    }

    const parsedSession = JSON.parse(session);
    const { user, userExp } = parsedSession;

    if (user && user !== ANONYMOUS_PRINCIPAL) {
        if (new Date().getTime() < parseInt(userExp)) {
            return true;
        }
        else {
            localStorage.clear();
            
        }
    }
    
    return false;
};

export default getSessionExpired;
