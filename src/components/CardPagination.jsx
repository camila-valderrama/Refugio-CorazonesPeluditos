import React from "react";

const CardPagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-8 font-serif">
      {/* Texto de página actual */}
      <p className="text-[#4D2600] text-base">
        Página {currentPage} de {totalPages}
      </p>

      {/* Botones de navegación */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-[#8B4513] text-white hover:bg-[#5c3310] disabled:bg-gray-300 disabled:text-gray-500 transition"
        >
          Anterior
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded border transition font-medium ${
              currentPage === page
                ? "bg-[#5c3310] text-white"
                : "bg-white text-[#8B4513] border-[#8B4513] hover:bg-[#f0e6dc]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-[#8B4513] text-white hover:bg-[#5c3310] disabled:bg-gray-300 disabled:text-gray-500 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CardPagination

