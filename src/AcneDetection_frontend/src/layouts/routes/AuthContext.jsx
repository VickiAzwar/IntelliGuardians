import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("session", "active");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
