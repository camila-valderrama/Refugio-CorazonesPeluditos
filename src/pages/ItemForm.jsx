import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import { toast } from "react-toastify";

export const ItemForm = ({ isEdit = false }) => {
  const { agregarMascota, actualizarMascota, obtenerUnaMascota } = useContext(MascotasContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    descripcion: "",
    imagen: "",
  });

  // Si estamos editando, traemos los datos actuales
  useEffect(() => {
    if (isEdit && id) {
      obtenerUnaMascota(id)
        .then((data) => setForm(data))
        .catch(() => toast.error("Error al cargar la mascota"));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.especie || !form.edad) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    try {
      if (isEdit) {
        await actualizarMascota(id, form);
        toast.success("Mascota actualizada con éxito");
      } else {
        await agregarMascota(form);
        toast.success("Mascota registrada con éxito");
      }

      navigate("/items");
    } catch (error) {
      toast.error("Error al guardar la mascota");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Editar Mascota" : "Registrar Nueva Mascota"}
      </h2>

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
        />
        <input
          type="number"
          name="edad"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? "Guardar Cambios" : "Registrar"}
        </button>
      </form>
    </div>
  );
}
