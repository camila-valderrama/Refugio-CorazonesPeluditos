import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/refugios",
});

export const obtenerRefugios = async () => {
  const res = await api.get("/");
  return res.data;
};
