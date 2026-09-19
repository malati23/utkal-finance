import React, { createContext, useState, useEffect } from 'react';
import {
  registerUser as storageRegisterUser,
  loginUser as storageLoginUser,
  logoutUser as storageLogoutUser,
  getCurrentUser as storageGetCurrentUser,
} from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load persisted currentUser from storage.js
    const currentUser = storageGetCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const sessionUser = storageLoginUser(credentials.email, credentials.password);
    setUser(sessionUser);
    return { user: sessionUser, token: 'mock-jwt-token' };
  };

  const register = async (userData) => {
    const sessionUser = storageRegisterUser({
      name: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password,
    });
    setUser(sessionUser);
    return { user: sessionUser, token: 'mock-jwt-token' };
  };

  const logout = () => {
    setUser(null);
    storageLogoutUser();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

