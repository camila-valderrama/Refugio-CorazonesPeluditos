import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  obtenerRefugios,
  obtenerRefugio,
  crearRefugio,
  actualizarRefugio,
  eliminarRefugio,
} from "../api/refugios";

export const RefugiosContext = createContext();

export const RefugiosProvider = ({ children }) => {
  const [refugios, setRefugios] = useState([]);
  const [refugioActual, setRefugioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar todos los refugios (para filtros o vista pública)
  const cargarRefugios = async () => {
    try {
      setCargando(true);
      const res = await obtenerRefugios();
      setRefugios(res.data);
    } catch (error) {
      console.error("Error al cargar refugios", error);
    } finally {
      setCargando(false);
    }
  };

  // Obtener refugio por ID
  const cargarRefugioPorId = async (id) => {
    try {
      const res = await obtenerRefugio(id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el refugio", error);
    }
  };

  // Obtener el refugio del usuario logueado (por lógica podrías filtrar desde el perfil)
  const cargarRefugioActual = async (usuarioId) => {
    try {
      const res = await obtenerRefugios(); // suponiendo que devuelve todos
      const encontrado = res.data.find((r) => r.usuario === usuarioId);
      if (encontrado) setRefugioActual(encontrado);
    } catch (error) {
      console.error("Error al obtener refugio del usuario", error);
    }
  };

  // Crear un nuevo refugio (solo para rol "refugio")
  const crearNuevoRefugio = async (datos) => {
    const res = await crearRefugio(datos);
    await cargarRefugios();
    return res.data;
  };

  // Actualizar refugio por ID
  const actualizarDatosRefugio = async (id, datos) => {
    const res = await actualizarRefugio(id, datos);
    await cargarRefugios();
    return res.data;
  };

  // Eliminar refugio
  const eliminarRefugioPorId = async (id) => {
    await eliminarRefugio(id);
    await cargarRefugios();
  };

  useEffect(() => {
    cargarRefugios();
  }, []);

  return (
    <RefugiosContext.Provider
      value={{
        refugios,
        refugioActual,
        cargando,
        cargarRefugios,
        cargarRefugioPorId,
        cargarRefugioActual,
        crearNuevoRefugio,
        actualizarDatosRefugio,
        eliminarRefugioPorId,
      }}
    >
      {children}
    </RefugiosContext.Provider>
  );
};

export const useRefugios = () => useContext(RefugiosContext);
