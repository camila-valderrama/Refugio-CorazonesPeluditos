import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ItemCard = ({ mascota, onEliminar, mostrarAcciones = true }) => {
  const { user } = useAuth();
  const edadEnMeses = parseInt(mascota.edad);

  const mostrarEdad = () => {
    if (isNaN(edadEnMeses)) return "Edad desconocida";
    if (edadEnMeses < 12) return `${edadEnMeses} ${edadEnMeses === 1 ? "mes" : "meses"}`;
    const años = Math.floor(edadEnMeses / 12);
    return `${años} ${años === 1 ? "año" : "años"}`;
  };

  const handleAdoptar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/mascotas/${mascota._id}/adoptar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Mascota adoptada con éxito");
    } catch (error) {
      toast.error(error.response?.data?.mensaje || "Error al adoptar");
    }
  };

  return (
    <div className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition duration-300 flex flex-col justify-between font-serif text-[#4D2600]">
      <div>
        {mascota.imagen && (
          <img
            src={mascota.imagen}
            alt={`Foto de ${mascota.nombre}`}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        )}
        <h3 className="text-2xl font-bold mb-1 text-[#8B4513]">{mascota.nombre}</h3>
        <p className="text-base">{mascota.raza} · {mascota.especie}</p>
        <p className="text-sm text-gray-600">Edad: {mostrarEdad()}</p>

        {mascota?.refugio?.nombre && (
          <p className="text-sm text-gray-500 italic mt-1">
            Refugio: {mascota.refugio.nombre}
          </p>
        )}

        {mascota.adoptada && (
          <p className="text-green-700 text-sm mt-1 font-semibold">🐾 Adoptada</p>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/items/${mascota._id}`}
          className="text-[#8B4513] hover:underline text-sm font-semibold"
        >
          Ver detalles
        </Link>

        {/* Mostrar solo si el usuario es adoptante y no fue adoptada aún */}
        {user?.rol === "usuario" && !mascota.adoptada && (
          <button
            onClick={handleAdoptar}
            className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
          >
            Adoptar
          </button>
        )}

        {/* Acciones solo para refugio */}
        {mostrarAcciones && user?.rol === "refugio" && (
          <div className="flex gap-3 items-center text-xl">
            <Link
              to={`/items/${mascota._id}/edit`}
              className="text-yellow-600 hover:text-yellow-700"
              title="Editar"
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button
              onClick={() => onEliminar(mascota._id)}
              className="text-red-600 hover:text-red-700"
              title="Eliminar"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
