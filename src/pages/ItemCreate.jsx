import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import { useMascotaForm } from "../hooks/useMascotaForm";
import Formulario from "../components/Formulario";
import { toast } from "react-toastify";

const ItemCreate = () => {
  const { agregarMascota } = useContext(MascotasContext);
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    await agregarMascota(form);
    toast.success("Mascota registrada con éxito");
    navigate("/items");
  };

  const { form, handleChange, handleSubmit } = useMascotaForm({ onSubmit });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar Nueva Mascota</h2>
      <Formulario form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default ItemCreate

