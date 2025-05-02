import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario"; // tipo por defecto

  const { login } = useAuth();

  const onSubmit = async (form) => {
    try {
      const usuario = await login(form); // esto debería devolver el usuario logueado
      toast.success("Inicio de sesión exitoso");

      // Redireccionar según el rol
      if (usuario.rol === "refugio") {
        navigate("/admin/refugio");
      } else {
        navigate("/items");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }
  };

  const { form, handleChange, handleSubmit } = useAuthForm({ onSubmit });

  return (
    <div className="p-6 font-serif text-[#4D2600] max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#8B4513]">
        Iniciar sesión
      </h2>

      <FormularioAuth form={form} handleChange={handleChange} handleSubmit={handleSubmit} />

      {/* Enlace a registro con tipo mantenido */}
      <p className="text-center mt-4 text-sm">
        ¿No tenés cuenta?{" "}
        <Link
          to={`/signup?tipo=${tipo}`}
          className="text-[#A0522D] font-semibold hover:underline"
        >
          Registrate acá
        </Link>
      </p>
    </div>
  );
};
