import React, { useEffect, useState } from "react";
import { useMascotas } from "../context/MascotasContext";
import { useRefugios } from "../context/RefugiosContext";
import ItemCard from "../components/ItemCard";
import CardPagination from "../components/CardPagination";

const ItemsListRefugios = () => {
  const {
    cargarMascotas,
    mascotas,
    totalPages,
    currentPage,
    setCurrentPage,
    cargando,
  } = useMascotas();

  const { refugios, cargarRefugios } = useRefugios();
  const [refugioSeleccionado, setRefugioSeleccionado] = useState("");

  useEffect(() => {
    cargarRefugios();
  }, []);

  useEffect(() => {
    cargarMascotas(currentPage, {
      refugio: refugioSeleccionado,
    });
  }, [refugioSeleccionado, currentPage]);

  return (
    <div className="p-6 font-serif text-[#4D2600] space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-4">
        Mascotas por Refugio
      </h2>

      {/* Filtro por refugio */}
      <div className="max-w-md mx-auto">
        <select
          value={refugioSeleccionado}
          onChange={(e) => {
            setRefugioSeleccionado(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Ver todas las mascotas --</option>
          {refugios.map((r) => (
            <option key={r._id} value={r._id}>
              {r.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de mascotas */}
      {cargando ? (
        <p className="text-center text-[#8B4513]">Cargando mascotas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No hay mascotas disponibles
            </p>
          ) : (
            mascotas.map((m) => <ItemCard key={m._id} mascota={m} />)
          )}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <CardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default ItemsListRefugios
