import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

const Login = () => {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario";

  const { iniciarSesion } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await iniciarSesion(data);
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <div className="p-6 font-serif text-[#4D2600] max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#8B4513]">
        Iniciar sesión
      </h2>

      <FormularioAuth
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
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



