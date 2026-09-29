import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  memberLoginApi,
  getMemberProfileApi,
  changePasswordApi,
} from '../services/authService';

const MemberAuthContext = createContext(null);

export function MemberAuthProvider({ children }) {
  const [memberUser, setMemberUser] = useState(() => {
    const saved = localStorage.getItem('utkal_member_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [application, setApplication] = useState(() => {
    const saved = localStorage.getItem('utkal_member_app');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('utkal_member_token') || null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Refresh profile on mount if token is available
  const refreshProfile = useCallback(async () => {
    const activeToken = token || localStorage.getItem('utkal_member_token');
    if (!activeToken) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await getMemberProfileApi(activeToken);
      if (res && res.user) {
        setMemberUser(res.user);
        localStorage.setItem('utkal_member_user', JSON.stringify(res.user));
        if (res.application) {
          setApplication(res.application);
          localStorage.setItem('utkal_member_app', JSON.stringify(res.application));
        }
      }
    } catch (err) {
      console.warn('Could not refresh member profile with token:', err.message);
      // If token expired or invalid, keep existing cache or clear if 401
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const res = await memberLoginApi({ identifier, password });
      setToken(res.token);
      setMemberUser(res.user);
      setApplication(res.application || null);

      localStorage.setItem('utkal_member_token', res.token);
      localStorage.setItem('utkal_member_user', JSON.stringify(res.user));
      if (res.application) {
        localStorage.setItem('utkal_member_app', JSON.stringify(res.application));
      }

      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setMemberUser(null);
    setApplication(null);
    setToken(null);
    localStorage.removeItem('utkal_member_token');
    localStorage.removeItem('utkal_member_user');
    localStorage.removeItem('utkal_member_app');
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const activeToken = token || localStorage.getItem('utkal_member_token');
    const res = await changePasswordApi({ currentPassword, newPassword }, activeToken);
    
    // Update local mustChangePassword state
    if (memberUser) {
      const updatedUser = { ...memberUser, mustChangePassword: false };
      setMemberUser(updatedUser);
      localStorage.setItem('utkal_member_user', JSON.stringify(updatedUser));
    }

    return res;
  };

  const value = {
    memberUser,
    application,
    token,
    isAuthenticated: !!token && !!memberUser,
    isLoading,
    login,
    logout,
    updatePassword,
    refreshProfile,
  };

  return (
    <MemberAuthContext.Provider value={value}>
      {children}
    </MemberAuthContext.Provider>
  );
}

export function useMemberAuth() {
  const context = useContext(MemberAuthContext);
  if (!context) {
    throw new Error('useMemberAuth must be used within a MemberAuthProvider');
  }
  return context;
}
