import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext";
import { useAuth } from "../context/AuthContext";
import { useMascotaForm } from "../hooks/useMascotaForm";
import Formulario from "../components/Formulario";
import { toast } from "react-toastify";

const ItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAPet, updatePet } = useMascotas();

  // Protección de acceso
  useEffect(() => {
    if (user?.rol !== "refugio") {
      toast.error("Acceso no autorizado");
      navigate("/items");
    }
  }, [user, navigate]);

  const onSubmit = async (form) => {
    try {
      await updatePet(id, form);
      toast.success("Mascota actualizada con éxito");
      navigate("/items");
    } catch (error) {
      const mensaje = error?.response?.data?.mensaje || "Error al actualizar";
      toast.error(mensaje);
    }
  };

  const { register, handleSubmit, errors, setValuesFromAPI } = useMascotaForm({
    onSubmit,
    isEdit: true,
  });

  // Cargar datos de la mascota al montar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getAPet(id);
        setValuesFromAPI(data);
      } catch (error) {
        toast.error("Error al cargar los datos de la mascota");
        navigate("/items");
      }
    };

    cargarDatos();
  }, [id, getAPet, setValuesFromAPI, navigate]);

  return (
    <div className="p-6 max-w-xl mx-auto font-serif text-[#4D2600]">
      <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">Editar Mascota</h2>
      <Formulario
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ItemEdit;
