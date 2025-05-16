import React, { createContext, useState, useEffect, useContext } from "react";
import {
  obtenerMascotasPublicas,
  obtenerMascotasDeRefugio,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
  adoptarMascota,
} from "../api/mascotas";
import { obtenerRefugios } from "../api/refugios";

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

  // Cargar lista de mascotas con filtros y paginado
  const cargarMascotas = async (pagina = 1, filtrosExtra = {}) => {
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

  // Mascotas del refugio logueado
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
    await cargarMascotas(currentPage, filtros);
    return nueva;
  };

  // Editar mascota
  const updatePet = async (id, datos) => {
    const actualizada = await actualizarMascota(id, datos);
    await cargarMascotas(currentPage, filtros);
    return actualizada;
  };

  // Eliminar mascota
  const borrarMascota = async (id) => {
    await eliminarMascota(id);
    await cargarMascotas(currentPage, filtros);
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

  // Cargar refugios disponibles (solo si hay filtros que lo requieren)
  const cargarRefugios = async () => {
    try {
      const res = await obtenerRefugios();
      setRefugios(res.data);
    } catch (error) {
      console.error("Error al cargar refugios:", error);
    }
  };

  // Inicial
  useEffect(() => {
    cargarMascotas();
    cargarRefugios();
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
        borrarMascota, 
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
