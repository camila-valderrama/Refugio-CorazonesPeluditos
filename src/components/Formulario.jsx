import React from "react";
import { useNavigate } from "react-router-dom";


const Formulario = ({ form, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="especie"
        value={form.especie}
        onChange={handleChange}
        placeholder="Especie (ej: perro, gato)"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="raza"
        value={form.raza}
        onChange={handleChange}
        placeholder="Raza"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="edad"
        value={form.edad}
        onChange={handleChange}
        placeholder="Edad (en meses)"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="url"
        name="imagen"
        value={form.imagen}
        onChange={handleChange}
        placeholder="URL de imagen (opcional)"
        className="w-full border px-3 py-2 rounded"
      />
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

export default Formulario
  