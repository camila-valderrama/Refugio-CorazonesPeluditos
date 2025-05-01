import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    console.log("Registro con:", form);
    toast.success("Registro exitoso (simulado)");
    navigate("/login");
  };

  const { form, handleChange, handleSubmit } = useAuthForm({
    onSubmit,
    isRegister: true,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
      <FormularioAuth
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isRegister={true}
      />
    </div>
  );
};
