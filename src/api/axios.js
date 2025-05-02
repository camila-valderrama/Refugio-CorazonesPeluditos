import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // Cambia si lo desplegás
});

export default api;
