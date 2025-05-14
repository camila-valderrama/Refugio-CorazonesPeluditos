import React from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import FormularioAuth from "../components/FormularioAuth";
import axios from "../api/auth";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
  rol: yup.string().required("El rol es obligatorio"),
  nombreRefugio: yup.string().when("rol", {
    is: "refugio",
    then: (schema) => schema.required("El nombre del refugio es obligatorio"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Signup = () => {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "usuario";

  const navigate = useNavigate();
  const { registrarUsuario } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rol: tipo,
    },
  });

  const rol = watch("rol");

  const onSubmit = async (data) => {
    try {
      const nuevoUsuario = await registrarUsuario(data);

      if (data.rol === "refugio") {
        await axios.post("/refugios", {
          nombre: data.nombreRefugio,
          usuario: nuevoUsuario._id,
        });
        toast.info("Refugio creado correctamente");
      }

      toast.success("Registro exitoso");
      navigate(`/login?tipo=${data.rol}`);
    } catch (error) {
      toast.error("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <div className="p-6 font-serif text-[#4D2600] max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#8B4513]">
        Crear cuenta
      </h2>

      <FormularioAuth
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isRegister={true}
      />

      <p className="text-center mt-4 text-sm">
        ¿Ya tenés cuenta?{" "}
        <Link
          to={`/login?tipo=${rol || "usuario"}`}
          className="text-[#A0522D] font-semibold hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
};

export default Signup;
