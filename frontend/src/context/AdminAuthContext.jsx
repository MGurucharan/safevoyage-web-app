import React, { createContext } from 'react';

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = React.useState(false);

  const login = React.useCallback(() => setIsAdmin(true), []);
  const logout = React.useCallback(() => setIsAdmin(false), []);

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
