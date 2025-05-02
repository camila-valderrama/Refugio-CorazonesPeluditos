import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Crear contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Guardar token en localStorage
      localStorage.setItem("token", res.data.token);

      // Guardar usuario en estado global
      setUser(res.data.usuario);

      toast.success("Inicio de sesión exitoso");
      navigate("/items");
    } catch (error) {
      toast.error(error.response?.data?.mensaje || "Error en login");
    }
  };

  const signup = async ({ nombre, email, password }) => {
    try {
      await api.post("/auth/register", { nombre, email, password });
      toast.success("Usuario registrado");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.mensaje || "Error al registrarse");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Sesión cerrada");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
