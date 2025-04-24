import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { MascotasContext } from "../context/MascotasContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerUnaMascota, borrarMascota } = useContext(MascotasContext);
  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMascota = async () => {
      try {
        const data = await obtenerUnaMascota(id);
        setMascota(data);
      } catch (error) {
        console.error("Error al obtener la mascota:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarMascota();
  }, [id]);

  const handleEliminar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la mascota permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarMascota(id);
          toast.success("Mascota eliminada");
          navigate("/items");
        } catch (error) {
          toast.error("Error al eliminar la mascota");
        }
      }
    });
  };

  if (cargando) return <p className="p-4 text-center font-serif text-[#8B4513]">Cargando detalles...</p>;
  if (!mascota) return <p className="p-4 text-center text-red-500 font-serif">Mascota no encontrada.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto font-serif text-[#4D2600]">
      <h2 className="text-3xl font-bold mb-4 text-[#8B4513]">{mascota.nombre}</h2>

      {mascota.imagen && (
        <img
          src={mascota.imagen}
          alt={`Foto de ${mascota.nombre}`}
          className="w-full h-64 object-cover rounded shadow mb-6"
        />
      )}

      <div className="bg-[#FFFDF5] p-6 rounded shadow space-y-3">
        <p><strong>Especie:</strong> {mascota.especie}</p>
        <p><strong>Raza:</strong> {mascota.raza || "No especificada"}</p>
        <p><strong>Edad:</strong> {mascota.edad} años</p>
        <p><strong>Descripción:</strong><br />{mascota.descripcion}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleEliminar}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-semibold"
        >
          Eliminar Mascota
        </button>

        <button
          onClick={() => navigate(`/items/${id}/edit`)}
          className="bg-[#FFB347] text-white px-4 py-2 rounded hover:bg-[#FFA500] font-semibold"
        >
          Editar Mascota
        </button>

        <button
          onClick={() => navigate("/items")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold"
        >
          Volver
        </button>
      </div>
    </div>
  );
};
