import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ mascota, onEliminar }) => {
  const edadEnMeses = parseInt(mascota.edad);

  const mostrarEdad = () => {
    if (isNaN(edadEnMeses)) return "Edad desconocida";
    if (edadEnMeses < 12) return `${edadEnMeses} ${edadEnMeses === 1 ? "mes" : "meses"}`;
    const años = Math.floor(edadEnMeses / 12);
    return `${años} ${años === 1 ? "año" : "años"}`;
  };

  return (
    <div className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition flex flex-col justify-between">
      <div>
        {mascota.imagen && (
          <img
            src={mascota.imagen}
            alt={`Foto de ${mascota.nombre}`}
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}
        <h3 className="text-xl font-semibold">{mascota.nombre}</h3>
        <p className="text-gray-700">{mascota.raza} · {mascota.especie}</p>
        <p className="text-sm text-gray-500">Edad: {mostrarEdad()}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/items/${mascota.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Ver detalles
        </Link>
        <div className="flex gap-3 items-center text-lg">
          <Link
            to={`/items/${mascota.id}/edit`}
            className="text-yellow-600 hover:text-yellow-700"
            title="Editar"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
          <button
            onClick={() => onEliminar(mascota.id)}
            className="text-red-600 hover:text-red-700"
            title="Eliminar"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
