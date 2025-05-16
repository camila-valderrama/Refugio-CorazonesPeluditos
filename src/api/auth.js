import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const register = (user) => api.post('/auth/register', user)
export const login = (credentials) => api.post('/auth/login', credentials)
export const profile = (token) =>
  api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
