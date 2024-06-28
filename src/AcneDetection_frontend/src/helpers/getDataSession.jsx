import React, { useEffect, useState } from 'react';


const getDataSession = () => {

    const [name, setName] = useState(null);
    const [user, setUser] = useState(null);
    const [userExp, setUserExp] = useState(null);

    useEffect(() => {

        const session = localStorage.getItem('session');
        if (session) {
            try {
                const parsedSession = JSON.parse(session);
                const {name, user, userExp} = parsedSession;
                setName(name);
                setUser(user);
                setUserExp(userExp);
            } catch (error) {
                console.error("Failed : ", error)
            }
        }
    }, []);

    return {name, user, userExp};

  
};

export default getDataSession;
