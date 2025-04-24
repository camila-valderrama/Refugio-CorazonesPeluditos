import axios from "axios";

// URL base en MockAPI
const API_URL = "https://680a36461f1a52874cdfa48f.mockapi.io/api/v1/mascotas";

// Obtener todas las mascotas
export const obtenerMascotas = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Obtener una mascota por ID 
export const obtenerMascotaPorId = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// Crear nueva mascota
export const crearMascota = async (nuevaMascota) => {
  const { data } = await axios.post(API_URL, nuevaMascota);
  return data;
};

// Editar mascota
export const editarMascota = async (id, datosActualizados) => {
  const { data } = await axios.put(`${API_URL}/${id}`, datosActualizados);
  return data;
};

// Eliminar mascota
export const eliminarMascota = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
