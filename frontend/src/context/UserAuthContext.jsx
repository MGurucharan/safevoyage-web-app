import React, { createContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('safevoyage_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('safevoyage_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('safevoyage_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('safevoyage_user');
  };

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('safevoyage_user', JSON.stringify(newUserData));
  };

  const refreshUserData = async () => {
    if (user && user.userId) {
      try {
        // Create a more robust refresh by checking profile data directly
        const response = await fetch(`http://localhost:5000/api/auth/profile/${user.userId}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Update user object with profile info including userID
            const updatedUser = {
              ...user,
              userID: result.data.userID, // SafeVoyage User ID
              isProfileComplete: result.data.isProfileComplete || user.isProfileComplete
            };
            setUser(updatedUser);
            localStorage.setItem('safevoyage_user', JSON.stringify(updatedUser));
          }
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    refreshUserData
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext };
