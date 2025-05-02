import React, { createContext, useState, useEffect, useContext } from "react";
import {
  obtenerMascotas,
  obtenerUnaMascota,
  agregarMascota as apiAgregarMascota,
  actualizarMascota as apiActualizarMascota,
  borrarMascota as apiBorrarMascota,
} from "../api/mascotas";

export const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar lista de mascotas al iniciar
  const cargarMascotas = async () => {
    try {
      setCargando(true);
      const data = await obtenerMascotas();
      setMascotas(data);
    } catch (error) {
      console.error("❌ Error al cargar mascotas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Crear nueva mascota
  const agregarMascota = async (mascota) => {
    try {
      const nueva = await apiAgregarMascota(mascota);
      setMascotas((prev) => [...prev, nueva]);
    } catch (error) {
      console.error("❌ Error al agregar mascota:", error);
    }
  };

  // Editar mascota existente
  const actualizarMascota = async (id, datos) => {
    try {
      const actualizada = await apiActualizarMascota(id, datos);
      setMascotas((prev) =>
        prev.map((m) => (m._id === id ? actualizada : m))
      );
    } catch (error) {
      console.error("❌ Error al actualizar mascota:", error);
    }
  };

  // Eliminar mascota
  const borrarMascota = async (id) => {
    try {
      await apiBorrarMascota(id);
      setMascotas((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar mascota:", error);
    }
  };

  // Obtener una sola mascota
  const obtenerUnaMascota = async (id) => {
    try {
      return await obtenerUnaMascota(id);
    } catch (error) {
      console.error("❌ Error al obtener mascota:", error);
      return null;
    }
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
};

export const useMascotas = () => useContext(MascotasContext);
