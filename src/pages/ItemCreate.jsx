import React from "react";
import { useNavigate } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext";
import { useAuth } from "../context/AuthContext";
import { useMascotaForm } from "../hooks/useMascotaForm";
import Formulario from "../components/Formulario";
import { toast } from "react-toastify";

const ItemCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createPet } = useMascotas();

  // Proteger acceso: solo refugios
  if (user?.rol !== "refugio") {
    toast.error("Acceso no autorizado");
    navigate("/items");
    return null;
  }

  const onSubmit = async (form) => {
    await createPet(form);
    toast.success("Mascota registrada con éxito");
    navigate("/items");
  };

  const { register, handleSubmit, errors } = useMascotaForm({ onSubmit });

  return (
    <div className="p-6 max-w-xl mx-auto font-serif text-[#4D2600]">
      <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">
        Registrar Nueva Mascota
      </h2>
      <Formulario
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ItemCreate;


