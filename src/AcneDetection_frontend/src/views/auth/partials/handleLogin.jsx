import { Principal } from '@dfinity/principal';

const iiCanisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;

export const getIdentityProviderUrl = () => {
    if (process.env.DFX_NETWORK === "local") {
        return `http://localhost:4943/?canisterId=${iiCanisterId}`;
    } else {
        return `https://${iiCanisterId}.ic0.app`;
    }
};

const ANONYMOUS_PRINCIPAL = "2vxsx-fae";
const SESSION_EXPIRY_TIME = 60 * 60 * 1000; // 1 jam

const handleLogin = async (authClient, actor, navigate) => {
    try {
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: getIdentityProviderUrl(),
                maxTimeToLive: BigInt(10 * 60 * 1000 * 1000 * 1000),
                onSuccess: resolve,
                onError: reject,
            });
        });

        // Check authentication
        const identity = authClient.getIdentity().getPrincipal();
        const principal = identity.toString();


        const check_user = await actor.read_user_by_id(identity);

        let users;
        if ((check_user.length === 0 || check_user[0] === null) && principal !== ANONYMOUS_PRINCIPAL) {
            console.log("test: ", check_user)
            users = await actor.create_users(principal);

        } else {
            users= check_user[0];
        }
        console.log("users", users)

        const session = {
            name: users.name,
            user: principal,
            userExp: new Date().getTime() + SESSION_EXPIRY_TIME
        };

        localStorage.setItem('session', JSON.stringify(session));
        navigate('/home');

    } catch (error) {
        console.log(error);
    }
}

export default handleLogin;
