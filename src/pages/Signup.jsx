import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";
import axios from "../api/axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario"; // usuario o refugio

  const { signup } = useAuth();

  const onSubmit = async (form) => {
    try {
      // Registro del usuario
      const nuevoUsuario = await signup(form);

      toast.success("Registro exitoso");

      // Si es tipo refugio, crear el refugio también
      if (tipo === "refugio") {
        await axios.post("/refugios", {
          nombre: form.nombre,
          usuario: nuevoUsuario._id,
        });
        toast.info("Refugio creado automáticamente");
      }

      navigate(`/login?tipo=${tipo}`);
    } catch (error) {
      toast.error("Error al registrarse");
    }
  };

  const { form, handleChange, handleSubmit } = useAuthForm({
    onSubmit,
    isRegister: true,
  });

  return (
    <div className="p-6 font-serif text-[#4D2600] max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#8B4513]">
        Crear cuenta
      </h2>

      <FormularioAuth
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isRegister={true}
      />

      {/* Enlace a login con tipo */}
      <p className="text-center mt-4 text-sm">
        ¿Ya tenés cuenta?{" "}
        <Link
          to={`/login?tipo=${tipo}`}
          className="text-[#A0522D] font-semibold hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
};
