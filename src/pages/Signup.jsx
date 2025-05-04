import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import { toast } from "react-toastify";
import axios from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const onSubmit = async (form) => {
    try {
      // Registro del usuario con rol seleccionado
      const nuevoUsuario = await signup({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        rol: form.rol,
      });

      toast.success("Registro exitoso");

      // Si es refugio, se crea automáticamente el refugio
      if (form.rol === "refugio") {
        await axios.post("/refugios", {
          nombre: form.nombreRefugio,
          usuario: nuevoUsuario._id,
        });
        toast.info("Refugio creado correctamente");
      }

      // Redirige al login con el rol en la query
      navigate(`/login?tipo=${form.rol}`);
    } catch (error) {
      toast.error("Error al registrarse");
      console.error(error);
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

      {/* Enlace a login con tipo según rol seleccionado */}
      <p className="text-center mt-4 text-sm">
        ¿Ya tenés cuenta?{" "}
        <Link
          to={`/login?tipo=${form.rol || "usuario"}`}
          className="text-[#A0522D] font-semibold hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}

export default Signup
