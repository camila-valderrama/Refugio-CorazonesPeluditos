import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaPrivada = ({ children }) => {
  const { user } = useAuth();

  // Si no está logueado, redirige a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, permite acceder al contenido
  return children;
};

export default RutaPrivada;

