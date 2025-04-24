import React from "react";

const Footer = () => {
    return (
      <footer className="bg-[#4C9FEC] text-white text-center py-4 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Corazones Peluditos. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-2">
          <i className="bi bi-telephone-fill hover:text-blue-900 cursor-pointer"></i>
          <i className="bi bi-envelope-fill hover:text-blue-900 cursor-pointer"></i>
          <i className="bi bi-instagram hover:text-blue-900 cursor-pointer"></i>
        </div>
      </footer>
    );
  }

  export default Footer