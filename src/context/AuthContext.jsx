import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, login, profile } from "../api/auth";
import api from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [nombreRefugio, setNombreRefugio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const verificarPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const res = await profile(token);
      const usuario = res.data.usuario;
      setUser(usuario);

      if (usuario.rol === "refugio") {
        const refugios = await api.get("/refugios");
        const refugioUsuario = refugios.data.find(
          (r) => r.usuario === usuario.id
        );
        setNombreRefugio(refugioUsuario?.nombre || null);
      }
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

  const iniciarSesion = async ({ email, password }) => {
    const res = await login({ email, password });
    const usuario = res.data.usuario;

    localStorage.setItem("token", res.data.token);
    setUser(usuario);

    if (usuario.rol === "refugio") {
      const refugios = await api.get("/refugios");
      const refugioUsuario = refugios.data.find(
        (r) => r.usuario === usuario.id
      );
      setNombreRefugio(refugioUsuario?.nombre || null);
    }

    toast.success("Inicio de sesión exitoso");
    navigate("/items");

    return usuario;
  };

  const registrarUsuario = async ({ nombre, email, password, rol }) => {
  const res = await register({ nombre, email, password, rol });

  const { usuario, token } = res.data;

  localStorage.setItem("token", token);
  setUser(usuario);

  if (usuario.rol === "refugio") {
    const refugios = await api.get("/refugios");
    const refugioUsuario = refugios.data.find(
      (r) => r.usuario === usuario.id
    );
    setNombreRefugio(refugioUsuario?.nombre || null);
  }

  toast.success("Usuario registrado");
  return { usuario, token };
};


  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUser(null);
    setNombreRefugio(null);
    toast.info("Sesión cerrada");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cargando,
        nombreRefugio,
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
