import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ItemCard from "../components/ItemCard";
import CardPagination from "../components/CardPagination";

export const ItemsList= () => {
  const { mascotas, cargando, borrarMascota } = useContext(MascotasContext);
  
  // Lógica para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Cuántos elementos mostrar por página

  useEffect(() => {
    // Resetea la página a 1 si las mascotas cambian
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

  if (cargando) return <p className="text-center p-4">Cargando mascotas...</p>;

  const mascotasPorPagina = mascotas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mascotas en adopción</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotasPorPagina.map((m) => (
        <ItemCard key={m.id} mascota={m} onEliminar={handleEliminar} />
        ))}
      </div>

      <CardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <div className="text-center mt-6">
        <Link
          to="/items/create"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          + Nueva Mascota
        </Link>
      </div>
    </div>
  );
}
