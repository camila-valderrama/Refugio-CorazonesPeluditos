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

  if (cargando) return <p className="p-4 text-center">Cargando detalles...</p>;
  if (!mascota) return <p className="p-4 text-center text-red-500">Mascota no encontrada.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{mascota.nombre}</h2>
      {mascota.imagen && (
        <img
          src={mascota.imagen}
          alt={`Foto de ${mascota.nombre}`}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p><strong>Especie:</strong> {mascota.especie}</p>
      <p><strong>Raza:</strong> {mascota.raza || "No especificada"}</p>
      <p><strong>Edad:</strong> {mascota.edad} años</p>
      <p className="mt-4"><strong>Descripción:</strong><br />{mascota.descripcion}</p>

      <div className="mt-6">
        <button
          onClick={handleEliminar}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Eliminar Mascota
        </button>
      </div>
      <div className="flex gap-4 mt-4">
        <button
            onClick={() => navigate(`/items/${id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Editar Mascota
        </button>

        <button
            onClick={() => navigate("/items")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Volver
        </button>
        </div>

    </div>
  );
}
