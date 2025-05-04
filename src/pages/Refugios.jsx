import React, { useEffect, useState } from "react";
import { obtenerRefugios } from "../api/refugios";
import ItemCard from "../components/ItemCard";

const Refugios = () => {
  const [refugios, setRefugios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [refugioSeleccionado, setRefugioSeleccionado] = useState(null);

  useEffect(() => {
    const cargarRefugios = async () => {
      const data = await obtenerRefugios();
      setRefugios(data);
    };
    cargarRefugios();
  }, []);

  useEffect(() => {
    const cargarMascotas = async () => {
      const url = refugioSeleccionado
        ? `/api/mascotas?refugio=${refugioSeleccionado}`
        : "/api/mascotas";
      const res = await fetch(`http://localhost:4000${url}`);
      const data = await res.json();
      setMascotas(data);
    };
    cargarMascotas();
  }, [refugioSeleccionado]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Refugios disponibles</h2>

      <select
        className="border p-2 rounded mb-4"
        onChange={(e) => setRefugioSeleccionado(e.target.value)}
      >
        <option value="">-- Ver todas las mascotas --</option>
        {refugios.map((r) => (
          <option key={r._id} value={r._id}>
            {r.nombre}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((m) => (
          <ItemCard key={m._id} mascota={m} />
        ))}
      </div>
    </div>
  );
}

export default Refugios
