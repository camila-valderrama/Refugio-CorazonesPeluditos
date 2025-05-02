import React from "react";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";

export const Signup = () => {
  const { signup } = useAuth(); // función desde el contexto

  const { form, handleChange, handleSubmit } = useAuthForm({
    onSubmit: signup,
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

