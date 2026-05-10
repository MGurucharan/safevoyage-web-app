import React from 'react';
import { AdminAuthContext } from './adminAuthContext';

export function AdminAuthProvider({ children }) {
  // Initialize state from sessionStorage (clears when browser closes)
  const [isAdmin, setIsAdmin] = React.useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const login = React.useCallback(() => {
    setIsAdmin(true);
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  }, []);

  const logout = React.useCallback(() => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  }, []);

  // Add an effect to handle storage events (for multi-tab support)
  React.useEffect(() => {
    // Clean up any existing localStorage admin auth on mount (migration)
    localStorage.removeItem('isAdminAuthenticated');
    
    const handleStorageChange = (e) => {
      if (e.key === 'isAdminAuthenticated') {
        setIsAdmin(e.newValue === 'true');
      }
    };

    // Handle beforeunload to ensure session cleanup
    const handleBeforeUnload = () => {
      // Session storage will be cleared automatically, but we can add additional cleanup here if needed
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const value = React.useMemo(
    () => ({ isAdmin, login, logout }), 
    [isAdmin, login, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
