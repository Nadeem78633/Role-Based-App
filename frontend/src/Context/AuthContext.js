// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, role: null });
  const navigate = useNavigate();

  useEffect(() => {
    // Get token and role from localStorage on initial render
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuthState({ token, role });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Save token and role to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Update auth state
      setAuthState({ token: res.data.token, role: res.data.role });

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.role === "editor") {
        navigate("/editor");
      } else if (res.data.role === "viewer") {
        navigate("/viewer");
      }
    } catch (err) {
      console.error("Invalid credentials", err);
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthState({ token: null, role: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
