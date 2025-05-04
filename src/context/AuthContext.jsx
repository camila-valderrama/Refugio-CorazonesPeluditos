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

      // Redirección según el rol
      const rol = res.data.usuario.rol;
      if (rol === "refugio") {
        navigate("/refugio/mis-mascotas");
      } else {
        navigate("/items");
      }
    } catch (error) {
      toast.error(error.response?.data?.mensaje || "Error en login");
    }
  };

  const signup = async ({ nombre, email, password, rol }) => {
    try {
      const res = await api.post("/auth/register", {
        nombre,
        email,
        password,
        rol, // <-- Incluir rol en la petición
      });

      toast.success("Usuario registrado");

      // Retornar datos para que Signup.jsx los use
      return res.data.usuario;
    } catch (error) {
      toast.error(error.response?.data?.mensaje || "Error al registrarse");
      throw error; // Propagar para que lo maneje Signup.jsx
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
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
