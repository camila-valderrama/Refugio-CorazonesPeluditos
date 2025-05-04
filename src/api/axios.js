import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export const register = (user) => api.post('/auth/register', user)
export const login = (credentials) => api.post('/auth/login', credentials)
export const profile = (token) => api.get('auth/profile', token)

export default api;
