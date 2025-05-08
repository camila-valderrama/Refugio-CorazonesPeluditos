import api from "./auth"

export const obtenerRefugios = () => api.get('/refugios/')
export const obtenerRefugio = (id) => api.get(`/refugios/refugio/${id}`)
export const crearRefugio = (data) => api.post('/refugios/crear-refugio', data)
export const actualizarRefugio = (id, data) => api.put(`/refugios/actualizar-refugio/${id}`, data)
export const eliminarRefugio = (id) => api.delete(`/refugios/eliminar-refugio/${id}`)

