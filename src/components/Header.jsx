import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="bg-[#FFE5B4] text-[#4D2600] shadow p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/refugio-logo.png"
            alt="Logo del Refugio"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold font-serif">Corazones Peluditos</span>
        </Link>

        {/* Botón Hamburguesa para móviles */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-3xl focus:outline-none"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Navegación */}
        <nav className={`flex-col lg:flex-row lg:flex lg:space-x-4 text-lg absolute lg:static top-20 left-0 w-full lg:w-auto bg-[#FFE5B4] p-4 lg:p-0 shadow-md lg:shadow-none ${menuAbierto ? "flex" : "hidden"}`}>
          <Link to="/" className="block py-2 px-4 hover:underline" onClick={() => setMenuAbierto(false)}>Inicio</Link>
          <Link to="/items" className="block py-2 px-4 hover:underline" onClick={() => setMenuAbierto(false)}>Mascotas</Link>
          <Link to="/items/create" className="block py-2 px-4 hover:underline" onClick={() => setMenuAbierto(false)}>Agregar</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header
