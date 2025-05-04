import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario";

  const { login } = useAuth();

  const onSubmit = async (form) => {
    try {
      await login(form); // la redirección ya ocurre dentro del contexto
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

      <FormularioAuth
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

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

export default Login;

