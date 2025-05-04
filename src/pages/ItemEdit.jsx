import React, { useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import { useMascotaForm } from "../hooks/useMascotaForm";
import Formulario from "../components/Formulario";
import { toast } from "react-toastify";

const ItemEdit = () => {
  const { id } = useParams();
  const { actualizarMascota, obtenerUnaMascota } = useContext(MascotasContext);
  const navigate = useNavigate();

  const cargarMascota = useCallback(() => obtenerUnaMascota(id), [id]);

  const onSubmit = async (form) => {
    await actualizarMascota(id, form);
    toast.success("Mascota actualizada con éxito");
    navigate("/items");
  };

  const { form, handleChange, handleSubmit } = useMascotaForm({
    isEdit: true,
    cargarMascota,
    onSubmit,
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Mascota</h2>
      <Formulario form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default ItemEdit
