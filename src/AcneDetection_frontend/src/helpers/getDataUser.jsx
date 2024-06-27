import React, { useEffect, useState } from 'react';
import { Principal } from '@dfinity/principal';
import initAuthClient from '../actorBackend/initAuthClient';
import { Actor, HttpAgent } from '@dfinity/agent';


const getDataUser = () => {

    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {

        const initAuth = async () => {
            const { authClient, actor } = await initAuthClient();

            const session = localStorage.getItem('session');
            if (session) {
                try {
                    const parsedSession = JSON.parse(session);
                    const { user } = parsedSession;
                    const principal = Principal.fromText(user);
                    const check_user = await actor.read_user_by_id(principal);
                    if (check_user[0] !== null || check_user.length !== 0) {
                        const userData = check_user[0];
                        const userJson = {
                            id: userData.id.toString(),
                            status: userData.status.toString(),
                            token: userData.token.toString(),
                            username: userData.username,
                            created_at: userData.created_at
                        };
                        setDataUser(userJson);
                    }

                } catch (error) {
                    if (error && error.message.includes('Invalid certificate: Signature verification failed')) {
                        console.error("Certificate verification failed. Fetching root key for local development.");
                        const { agent } = await initAuthClient();
                        await agent.fetchRootKey();
                        initAuth();
                    } else {
                        console.error("Failed to initialize authentication:", error);
                    }
                }
            }
        }
        initAuth();

    }, []);

    return dataUser;


};

export default getDataUser;
