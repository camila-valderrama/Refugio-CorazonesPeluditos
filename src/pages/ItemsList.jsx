import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ItemCard from "../components/ItemCard";
import CardPagination from "../components/CardPagination";

export const ItemsList = () => {
  const { mascotas, cargando, borrarMascota } = useContext(MascotasContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [mascotas]);

  const totalPages = Math.ceil(mascotas.length / itemsPerPage);

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

  if (cargando)
    return (
      <p className="text-center p-4 font-serif text-[#8B4513]">
        Cargando mascotas...
      </p>
    );

  const mascotasPorPagina = mascotas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 font-serif text-[#4D2600]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#8B4513]">
          Mascotas en Adopción
        </h2>
        <Link
          to="/items/create"
          className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          + Nueva Mascota
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotasPorPagina.map((m) => (
          <ItemCard key={m.id} mascota={m} onEliminar={handleEliminar} />
        ))}
      </div>

      <div className="mt-8">
        <CardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
