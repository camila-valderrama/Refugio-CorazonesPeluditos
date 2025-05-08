import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  obtenerMascotasPublicas,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
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

  // Cargar mascotas con paginado y filtros
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

  const createPet = async (mascota) => {
    const nueva = await crearMascota(mascota);
    await cargarMascotas(currentPage);
    return nueva;
  };

  const updatePet = async (id, datos) => {
    const actualizada = await actualizarMascota(id, datos);
    await cargarMascotas(currentPage);
    return actualizada;
  };

  const deletePet = async (id) => {
    await eliminarMascota(id);
    await cargarMascotas(currentPage);
  };

  const getAPet = async (id) => {
    const res = await obtenerMascota(id);
    return res.data;
  };

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
        createPet,
        getAPet,
        updatePet,
        deletePet,
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
