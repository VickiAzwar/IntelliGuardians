import { AuthClient } from '@dfinity/auth-client';
import { createActor } from './createActor';

const initAuthClient = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = await createActor(identity);
    return { authClient, actor };
};

export default initAuthClient;