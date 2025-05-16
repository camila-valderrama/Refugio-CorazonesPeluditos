import api from "./auth"

export const obtenerMascotasPublicas = () => api.get('/mascotas/')
export const obtenerMascotasDeRefugio = () => api.get('/mascotas/mascotas-refugio')
export const obtenerMascota = (id) => api.get(`/mascotas/mascota/${id}`)
export const crearMascota = (mascota) =>
  api.post("/mascotas/crear-mascota", mascota, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const actualizarMascota = (id, data) => api.put(`/mascotas/actualizar-mascota/${id}`, data)
export const eliminarMascota = (id) => api.delete(`/mascotas/eliminar-mascota/${id}`)
export const adoptarMascota = (id) => api.put(`/mascotas/adoptar/${id}`)

