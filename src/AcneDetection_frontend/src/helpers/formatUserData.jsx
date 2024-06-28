// utils.js
const formatUserData = (userData) => {
    if (!userData) return null;
  
    return {
      id: userData.id.toString(),
      status: userData.status.toString(),
      token: userData.token.toString(),
      username: userData.username,
      created_at: userData.created_at
    };
  };

  export default formatUserData;