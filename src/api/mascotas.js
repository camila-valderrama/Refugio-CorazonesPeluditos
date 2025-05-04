import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/mascotas",
});

export const obtenerMascotasPublicas = () => api.get('/mascotas/')
export const obtenerMascotasDeRefugio = () => api.get('/mascotas/mascotas-refugio')
export const obtenerMascota = (id) => api.get(`/mascotas/mascota/id${id}`)
export const crearMascota = (data) => api.post('/mascotas/crear-mascota', data)
export const actualizarMascota = (id, data) => api.put(`/mascotas/actualizar-mascota/${id}`, data)
export const eliminarMascota = (id) => api.delete(`/mascotas/eliminar-mascota/${id}`)
export const adoptarMascota = (id) => api.put(`/mascotas/adoptar/${id}`)

export default api;
