import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  obtenerMascotasPublicas,
  obtenerMascotasDeRefugio,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
  adoptarMascota,
} from "../api/mascotas";

export const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cargando, setCargando] = useState(true);

  const [filtros, setFiltros] = useState({
    especie: "",
    raza: "",
    refugio: "",
  });

  // Mascotas públicas (filtros, paginado)
  const cargarMascotas = async (pagina = 1, filtrosExtra = filtros) => {
    try {
      setCargando(true);
      const res = await obtenerMascotasPublicas({
        params: {
          page: pagina,
          limit: 6,
          ...filtrosExtra,
        },
      });
      setMascotas(res.data.mascotas);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Mascotas del refugio logueado (solo para rol refugio)
  const cargarMascotasDeRefugio = async () => {
    try {
      setCargando(true);
      const res = await obtenerMascotasDeRefugio();
      setMascotas(res.data);
    } catch (error) {
      console.error("Error al cargar mascotas del refugio:", error);
    } finally {
      setCargando(false);
    }
  };

  // Crear nueva mascota
  const createPet = async (mascota) => {
    const nueva = await crearMascota(mascota);
    await cargarMascotas(currentPage);
    return nueva;
  };

  // Editar mascota
  const updatePet = async (id, datos) => {
    const actualizada = await actualizarMascota(id, datos);
    await cargarMascotas(currentPage);
    return actualizada;
  };

  // Eliminar mascota
  const deletePet = async (id) => {
    await eliminarMascota(id);
    await cargarMascotas(currentPage);
  };

  // Obtener una sola mascota
  const getAPet = async (id) => {
    const res = await obtenerMascota(id);
    return res.data;
  };

  // Adoptar mascota
  const adoptar = async (id) => {
    const res = await adoptarMascota(id);
    return res.data;
  };

  // Inicial
  useEffect(() => {
    cargarMascotas();
  }, []);

  return (
    <MascotasContext.Provider
      value={{
        mascotas,
        refugios,
        totalPages,
        currentPage,
        cargando,
        cargarMascotas,
        cargarMascotasDeRefugio,
        createPet,
        getAPet,
        updatePet,
        deletePet,
        adoptar,
        setCurrentPage,
        filtros,
        setFiltros,
      }}
    >
      {children}
    </MascotasContext.Provider>
  );
};

export const useMascotas = () => useContext(MascotasContext);
