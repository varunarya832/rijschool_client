import React, { createContext, useState } from 'react';
import * as authAPI from '../service/auth.service';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);

  const handleLogin = async (creds) => {
    setLoading(true);
    try {
      const { token } = await authAPI.login(creds);
      localStorage.setItem('authToken', token);
      setToken(token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login: handleLogin, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
