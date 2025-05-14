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

  if (user?.rol !== "refugio") {
    toast.error("Acceso no autorizado");
    navigate("/items");
    return null;
  }

  const onSubmit = async (form) => {
    await updatePet(id, form);
    toast.success("Mascota actualizada con éxito");
    navigate("/items");
  };

  const { register, handleSubmit, errors, setValuesFromAPI } = useMascotaForm({
    onSubmit,
    isEdit: true,
  });

  useEffect(() => {
    getAPet(id).then((data) => {
      setValuesFromAPI(data);
    });
  }, [id]);

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

