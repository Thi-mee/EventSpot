import React, { createContext, useState, useEffect, useMemo } from "react";
import { authService } from "../services/authService";

// Create a new context for authentication
export const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  // State to track the authenticated user
  const [user, setUser] = useState(null);
  // State to track the authentication status
  const [isLoading, setIsLoading] = useState(true);
  // State to track the authentication error
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await authService.getUser(token);
          setUser(user);
        }
      } catch (error) {
        // Handle authentication error
        setError(error.message);
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user } = await authService.login(email, password);
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      // Handle login error
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      // Handle logout error
      setError(error.message);
    }
  };

  const resetError = () => setError(null);


  const value = useMemo(() => ({
    user,
    login,
    logout,
    isLoading,
    error,
    resetError
  }), [user]);

  // Render the AuthContext.Provider with the user object and authentication-related functions as the value
  return (
    <AuthContext.Provider
      value={value}>
      {children}
    </AuthContext.Provider>
  );
};
