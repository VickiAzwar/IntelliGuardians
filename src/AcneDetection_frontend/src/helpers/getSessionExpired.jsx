import React from 'react';

const ANONYMOUS_PRINCIPAL = "2vxsx-fae";
    
const getSessionExpired = () => {

    const session = localStorage.getItem('session');
    console.log("session: ", session);

    if (!session) {
        return false;
    }

    const parsedSession = JSON.parse(session);
    const { user, userExp } = parsedSession;

    if (user && user !== ANONYMOUS_PRINCIPAL) {
        console.log("masuk 1");
        if (new Date().getTime() < parseInt(userExp)) {
            console.log("masuk 2");
            return true;
        }
        else {
            console.log("masuk 3");
            localStorage.clear();
            
        }
    }
    
    return false;
};

export default getSessionExpired;
