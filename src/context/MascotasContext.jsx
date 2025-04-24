import { createContext, useState, useEffect } from "react";
import {
  obtenerMascotas,
  crearMascota,
  editarMascota,
  eliminarMascota,
  obtenerMascotaPorId,
} from "../api/mascotas";

export const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar lista de mascotas al inicio
  const cargarMascotas = async () => {
    try {
      setCargando(true);
      const data = await obtenerMascotas();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Crear nueva mascota
  const agregarMascota = async (mascota) => {
    const nueva = await crearMascota(mascota);
    setMascotas((prev) => [...prev, nueva]);
  };

  // Editar mascota existente
  const actualizarMascota = async (id, datos) => {
    const actualizada = await editarMascota(id, datos);
    setMascotas((prev) =>
      prev.map((m) => (m.id === id ? actualizada : m))
    );
  };

  // Eliminar mascota
  const borrarMascota = async (id) => {
    await eliminarMascota(id);
    setMascotas((prev) => prev.filter((m) => m.id !== id));
  };

  // Obtener una sola mascota
  const obtenerUnaMascota = async (id) => {
    return await obtenerMascotaPorId(id);
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  return (
    <MascotasContext.Provider
      value={{
        mascotas,
        cargando,
        cargarMascotas,
        agregarMascota,
        actualizarMascota,
        borrarMascota,
        obtenerUnaMascota,
      }}
    >
      {children}
    </MascotasContext.Provider>
  );
}

