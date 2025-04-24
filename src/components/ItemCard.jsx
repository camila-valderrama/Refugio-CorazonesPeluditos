import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ mascota }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
      {mascota.imagen && (
        <img
          src={mascota.imagen}
          alt={`Foto de ${mascota.nombre}`}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}
      <h3 className="text-xl font-semibold">{mascota.nombre}</h3>
      <p className="text-gray-700">{mascota.raza} · {mascota.especie}</p>
      <p className="text-sm text-gray-500">Edad: {mascota.edad} años</p>

      <div className="mt-4">
        <Link
          to={`/items/${mascota.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

export default ItemCard
