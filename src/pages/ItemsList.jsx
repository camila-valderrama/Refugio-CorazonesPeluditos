import React, { useEffect, useContext } from "react";
import { MascotasContext } from "../context/MascotasContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import CardPagination from "../components/CardPagination";

const ItemsList = () => {
  const {
    mascotas,
    refugios,
    cargando,
    borrarMascota,
    cargarMascotas,
    currentPage,
    totalPages,
    setCurrentPage,
    filtros,
    setFiltros,
  } = useContext(MascotasContext);

  const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const filtrosActualizados = { ...filtros };
    if (user?.rol === "refugio") {
      filtrosActualizados.refugio = user.refugioId; 
    }
    cargarMascotas(currentPage, filtrosActualizados);
  }, [currentPage, filtros, user]);

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar mascota?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarMascota(id);
          toast.success("Mascota eliminada");
        } catch (error) {
          toast.error("Error al eliminar");
        }
      }
    });
  };

  if (cargando) {
    return (
      <p className="text-center p-4 font-serif text-[#8B4513]">
        Cargando mascotas...
      </p>
    );
  }

  return (
    <div className="p-6 font-serif text-[#4D2600] space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-3xl font-bold text-[#8B4513]">
          Mascotas en Adopción
        </h2>

      {user?.rol === "refugio" && (
        <button
          onClick={() => navigate("/items/create")}
          className="bg-[#FFB347] hover:bg-[#FFA500] text-white px-4 py-2 rounded font-semibold"
        >
          + Agregar Mascota
        </button>
      )}
</div>
      {/* Filtros solo para adoptantes */}
      {user?.rol === "usuario" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="especie"
            placeholder="Especie"
            value={filtros.especie}
            onChange={(e) => setFiltros({ ...filtros, especie: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="raza"
            placeholder="Raza"
            value={filtros.raza}
            onChange={(e) => setFiltros({ ...filtros, raza: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          <select
            name="refugio"
            value={filtros.refugio}
            onChange={(e) => setFiltros({ ...filtros, refugio: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="">Todos los refugios</option>
            {refugios?.map((r) => (
              <option key={r._id} value={r._id}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Lista de mascotas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No se encontraron mascotas
          </p>
        ) : (
          mascotas.map((m) => (
            <ItemCard
              key={m._id}
              mascota={m}
              onEliminar={handleEliminar}
              mostrarAcciones={user?.rol === "refugio"}
              esAdoptante={user?.rol === "usuario"}
            />
          ))
        )}
      </div>

      {/* Paginado */}
      {totalPages > 1 && (
        <div className="mt-8">
          <CardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ItemsList;
