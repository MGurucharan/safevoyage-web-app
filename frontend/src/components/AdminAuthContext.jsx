import React, { createContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth";

export const AuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);
      setUser(data.user);
    } catch (err) {
      console.error("Register failed", err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AdminAuthProvider;
