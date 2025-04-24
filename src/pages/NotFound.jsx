import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 font-serif bg-[#FFF8F0]">
      <h1 className="text-5xl font-bold text-[#8B4513] mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-[#4D2600]">
        Uy, parece que te perdiste...<br />
        Serás redirigido a la página principal en unos segundos.
      </p>
    </div>
  );
};

