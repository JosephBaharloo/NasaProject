import React, { createContext, useState, useContext } from 'react';
import { User } from '../models/User';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Create User instance from data
    const userInstance = new User(
      userData.name,
      userData.surname,
      userData.email
    );
    setUser(userInstance);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
