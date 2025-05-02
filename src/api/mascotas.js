import axios from "axios";

const API_URL = "http://localhost:4000/api/mascotas";

// Función para obtener el token desde localStorage
const getToken = () => localStorage.getItem("token");

// Axios con token incluido
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
axiosAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const obtenerMascotas = async ({ page = 1, especie = "", raza = "", refugio = "" } = {}) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (especie) params.append("especie", especie);
  if (raza) params.append("raza", raza);
  if (refugio) params.append("refugio", refugio);

  const res = await axiosAuth.get(`/?${params.toString()}`);
  return res.data; // { mascotas, totalPages, currentPage, total }
};

export const obtenerUnaMascota = async (id) => {
  const res = await axiosAuth.get(`/${id}`);
  return res.data;
};

export const agregarMascota = async (datos) => {
  const res = await axiosAuth.post("/", datos);
  return res.data;
};

export const actualizarMascota = async (id, datos) => {
  const res = await axiosAuth.put(`/${id}`, datos);
  return res.data;
};

export const borrarMascota = async (id) => {
  const res = await axiosAuth.delete(`/${id}`);
  return res.data;
};
