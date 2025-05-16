import React from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { useAuthForm } from "../hooks/useAuthForm";
import { crearRefugio } from "../api/refugios";
import { toast } from "react-toastify";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario";
  const navigate = useNavigate();
  const { registrarUsuario } = useAuth();

  const onSubmit = async (data) => {
    try {
      // Registrar usuario y obtener token
      const nuevoUsuario = await registrarUsuario(data);
      const token = nuevoUsuario.token;

      // Si el rol es refugio, crear refugio asociado
      if (data.rol === "refugio") {
        await crearRefugio(
          { nombre: data.nombreRefugio },
          token
        );
        toast.info("Refugio creado correctamente");
      }

      toast.success("Registro exitoso");
      navigate(`/login?tipo=${data.rol}`);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.mensaje || "Error al registrarse. Inténtalo de nuevo."
      );
    }
  };

  const {
    register,
    handleSubmit,
    errors,
    rolSeleccionado,
  } = useAuthForm({ onSubmit, isRegister: true, defaultValues: { rol: tipo } });

  return (
    <div className="p-6 font-serif text-[#4D2600] max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#8B4513]">
        Crear cuenta
      </h2>

      <FormularioAuth
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isRegister={true}
        rolSeleccionado={rolSeleccionado}
      />

      <p className="text-center mt-4 text-sm">
        ¿Ya tenés cuenta?{" "}
        <Link
          to={`/login?tipo=${rolSeleccionado || "usuario"}`}
          className="text-[#A0522D] font-semibold hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
};

export default Signup;
