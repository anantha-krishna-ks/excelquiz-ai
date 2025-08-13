import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginResponse } from '@/lib/api';

interface AuthContextType {
  user: LoginResponse | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('excelsoft_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('excelsoft_user');
      }
    }
  }, []);

  const login = (userData: LoginResponse) => {
    setUser(userData);
    localStorage.setItem('excelsoft_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('excelsoft_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};