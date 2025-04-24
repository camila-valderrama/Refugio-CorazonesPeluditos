
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound= () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirige después de 3 segundos

    return () => clearTimeout(timer); // Limpieza del timeout
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-gray-700">
        Serás redirigido a la página principal en unos segundos...
      </p>
    </div>
  );
}
