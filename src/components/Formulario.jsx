import React from "react";
import { useNavigate } from "react-router-dom";

const Formulario = ({ register, handleSubmit, errors, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit} className="space-y-4 font-serif text-[#4D2600]">
      <input
        type="text"
        placeholder="Nombre"
        {...register("nombre")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

      <input
        type="text"
        placeholder="Especie (ej: perro, gato)"
        {...register("especie")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.especie && <p className="text-red-500 text-sm">{errors.especie.message}</p>}

      <input
        type="text"
        placeholder="Raza"
        {...register("raza")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.raza && <p className="text-red-500 text-sm">{errors.raza.message}</p>}

      <input
        type="number"
        placeholder="Edad (en meses)"
        {...register("edad")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}

      <textarea
        placeholder="Descripción"
        {...register("descripcion")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}

      <input
        type="url"
        placeholder="URL de imagen (opcional)"
        {...register("imagen")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}

      <div className="flex justify-between gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 flex items-center justify-center gap-2"
        >
          <i className="bi bi-arrow-left"></i>
          Volver atrás
        </button>
      </div>
    </form>
  );
};

export default Formulario;
