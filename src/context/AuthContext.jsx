import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  register,
  login,
  profile,
} from "../api/auth"; // funciones API externas

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Verifica el token y obtiene perfil
  const verificarPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setCargando(false);

    try {
      const res = await profile(token);
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
    verificarPerfil();
  }, []);

  // Iniciar sesión
  const iniciarSesion = async ({ email, password }) => {
    const res = await login({ email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.usuario);
    toast.success("Inicio de sesión exitoso");

    const { rol } = res.data.usuario;
    navigate(rol === "refugio" ? "/refugio/mis-mascotas" : "/items");

    return res.data.usuario;
  };

  // Registrar usuario
  const registrarUsuario = async ({ nombre, email, password, rol }) => {
    const res = await register({ nombre, email, password, rol });
    toast.success("Usuario registrado");
    return res.data.usuario;
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Sesión cerrada");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cargando,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
