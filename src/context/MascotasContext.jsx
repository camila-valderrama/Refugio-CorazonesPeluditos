import React, { createContext, useState, useEffect, useContext } from "react";
import {
  obtenerMascotas as apiObtenerMascotas,
  obtenerUnaMascota as apiObtenerUnaMascota,
  agregarMascota as apiAgregarMascota,
  actualizarMascota as apiActualizarMascota,
  borrarMascota as apiBorrarMascota,
} from "../api/mascotas";
import axios from "../api/axios";

export const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Guardamos los filtros seleccionados
  const [filtros, setFiltros] = useState({
    especie: "",
    raza: "",
    refugio: ""
  });

  // Cargar mascotas con paginado y filtros
  const cargarMascotas = async (pagina = 1, filtrosExtra = filtros) => {
    try {
      setCargando(true);
      const data = await apiObtenerMascotas({
        page: pagina,
        limit: 6,
        ...filtrosExtra
      });
      setMascotas(data.mascotas);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Cargar lista de refugios para filtros
  const cargarRefugios = async () => {
    try {
      const res = await axios.get("/refugios");
      setRefugios(res.data);
    } catch (error) {
      console.error("Error al cargar refugios:", error);
    }
  };

  const agregarMascota = async (mascota) => {
    const nueva = await apiAgregarMascota(mascota);
    await cargarMascotas(currentPage);
    return nueva;
  };

  const actualizarMascota = async (id, datos) => {
    const actualizada = await apiActualizarMascota(id, datos);
    await cargarMascotas(currentPage);
    return actualizada;
  };

  const borrarMascota = async (id) => {
    await apiBorrarMascota(id);
    await cargarMascotas(currentPage);
  };

  const obtenerUnaMascota = async (id) => {
    return await apiObtenerUnaMascota(id);
  };

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
        agregarMascota,
        actualizarMascota,
        borrarMascota,
        obtenerUnaMascota,
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
