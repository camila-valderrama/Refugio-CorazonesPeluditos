import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Verifica token y obtiene datos del usuario
  const verificarToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const res = await api.get("/auth/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.usuario);
    } catch (error) {
      console.error("Token inválido o expirado");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verificarToken();
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.usuario);

    toast.success("Inicio de sesión exitoso");

    const rol = res.data.usuario.rol;
    if (rol === "refugio") {
      navigate("/refugio/mis-mascotas");
    } else {
      navigate("/items");
    }

    return res.data.usuario;
  };

  const signup = async ({ nombre, email, password, rol }) => {
    const res = await api.post("/auth/register", {
      nombre,
      email,
      password,
      rol,
    });

    toast.success("Usuario registrado");
    return res.data.usuario;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Sesión cerrada");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, cargando, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
