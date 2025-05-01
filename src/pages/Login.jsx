import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    console.log("Login con:", form);
    toast.success("Inicio de sesión exitoso (simulado)");
    navigate("/items");
  };

  const { form, handleChange, handleSubmit } = useAuthForm({ onSubmit });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
      <FormularioAuth form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};
