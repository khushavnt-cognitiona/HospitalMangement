import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserData = (newData) => {
    let updatedUser = { ...user, ...newData };
    
    // If the state structure has a nested 'user' object (typical for auth responses),
    // we must update that nested object too to avoid stale data in components.
    if (user && user.user) {
      updatedUser.user = { ...user.user, ...newData };
    }
    
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!user;
  // Providing 'auth' as an alias for 'user' to support legacy components
  const auth = user;

  return (
    <AuthContext.Provider value={{ user, auth, isAuthenticated, login, register, logout, updateUserData, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
