'use client'
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

 
  useEffect(() => {
    const handleCookieChange = () => {
      console.log('test')
      const token = Cookies.get('token');
      setIsAuthenticated(!!token); 
    };
    
    window.addEventListener('cookiechange', handleCookieChange);

    return () => {
      window.removeEventListener('cookiechange', handleCookieChange);
    };
  }, []);

  const login = () => {
    setIsAuthenticated(true); 
    router.push('/'); 
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('email');
    setIsAuthenticated(false);
    router.push('/'); 
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
