import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ mascota, onEliminar, mostrarAcciones = true }) => {
  const edadEnMeses = parseInt(mascota.edad);

  const mostrarEdad = () => {
    if (isNaN(edadEnMeses)) return "Edad desconocida";
    if (edadEnMeses < 12) return `${edadEnMeses} ${edadEnMeses === 1 ? "mes" : "meses"}`;
    const años = Math.floor(edadEnMeses / 12);
    return `${años} ${años === 1 ? "año" : "años"}`;
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
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/items/${mascota.id}`}
          className="text-[#8B4513] hover:underline text-sm font-semibold"
        >
          Ver detalles
        </Link>

        {/* Solo mostrar las acciones (editar/eliminar) si mostrarAcciones es true */}
        {mostrarAcciones && (
          <div className="flex gap-3 items-center text-xl">
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
        )}
      </div>
    </div>
  );
};

export default ItemCard
