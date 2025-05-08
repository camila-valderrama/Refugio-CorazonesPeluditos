import axios from "axios";

const api = axios.create({
  baseURL: 'https://refugio-corazonespeluditos-backend.onrender.com/',
});

export const register = (user) => api.post('/auth/register', user)
export const login = (credentials) => api.post('/auth/login', credentials)
export const profile = (token) =>
  api.get("/auth/perfil", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
