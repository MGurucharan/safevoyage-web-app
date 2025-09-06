import React from 'react';
import { AdminAuthContext } from './adminAuthContext';

export function AdminAuthProvider({ children }) {
  // Initialize state from localStorage
  const [isAdmin, setIsAdmin] = React.useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const login = React.useCallback(() => {
    setIsAdmin(true);
    localStorage.setItem('isAdminAuthenticated', 'true');
  }, []);

  const logout = React.useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem('isAdminAuthenticated');
  }, []);

  // Add an effect to handle storage events (for multi-tab support)
  React.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'isAdminAuthenticated') {
        setIsAdmin(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
