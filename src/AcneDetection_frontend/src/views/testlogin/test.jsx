import React , {useState, useEffect} from "react";
import { Principal } from '@dfinity/principal';
import Button from "../../component/Button/Button";
import initAuthClient from '../../actorBackend/initAuthClient'
import { useNavigate } from "react-router-dom";
import loginImg from "../../../assets/image/acneimg.jpg"

const iiCanisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
const ANONYMOUS_PRINCIPAL = "2vxsx-fae";

function MyComponent () {
    const [authClient, setAuthClient] = useState(null);
    const [user, setUser] = useState(null);
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
          const {authClient, actor} = await initAuthClient();
          setAuthClient(authClient);
          setActor(actor);

          const storedAuth = localStorage.getItem('user');
          if (storedAuth && storedAuth !== ANONYMOUS_PRINCIPAL) {
            setIsAuthenticated(true);
            navigate('/haha');
          }
          setLoading(false);
        };
        initAuth();
        
      }, []);

      const handleLogin = async () => {
        try {
    
          // Start login
          await new Promise((resolve, reject) => {
            authClient.login({
              identityProvider: getIdentityProviderUrl(),
              maxTimeToLive: BigInt(10 * 60 * 1000 * 1000 * 1000),
              onSuccess: resolve,
              onError: reject,
            });
          });
    
          // Check Authentication
          const identity = authClient.getIdentity().getPrincipal();
        //   const principal = Principal.fromText(identity);
          console.log("Identity : ", identity);
    
          const whoami = await actor.whoami();
          console.log("whoami: ", whoami.toText())
    
          let users;
    
          let check_user = await actor.read_user_by_id(identity);
          console.log("check user: ", check_user);

          let validateuser = await actor.is_user_logged_in(identity);
          console.log("validate user: ", validateuser);
    
          if ((check_user.length === 0 || check_user[0] === null) && identity !== ANONYMOUS_PRINCIPAL) {
            users = await actor.create_users(identity.toString());
            console.log("REGISTER");
          } else {
            console.log("Masuk ke SUDAH ADA akun");
            users = check_user[0];
          }
    
          setUser(users);
          // Save session
          localStorage.setItem('user', identity);
          console.log("user : ", user);
          navigate('/haha');
    
        } catch (error) {
          console.log(error);
        }
      }
    
      const handleLogout = async () => {
        await authClient.logout();
        setUser(null);
        localStorage.removeItem('principal');
        navigate('/login');
      };
    
      const getIdentityProviderUrl = () => {
        if (process.env.DFX_NETWORK === "local") {
          return `http://localhost:4943/?canisterId=${iiCanisterId}`;
        } else {
          return `https://${iiCanisterId}.ic0.app`;
        }
      };
    
     
      console.log("users2: ", user);
    
      if (loading) {
        return <div>Loading...</div>; // Show loading state while initializing
      }

    return (
      <>
      {!user ? (
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
             <Button  className='' primary onClick={handleLogin}>
                 Login Internet Identity
             </Button>
         </div>
        </div>
      ): (
        <div>
        <p>Welcome, {user.id.toString()}</p>
        <p>You have {user.token.toString()} coins.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      )}
      </>
    );
  
};

export default MyComponent;