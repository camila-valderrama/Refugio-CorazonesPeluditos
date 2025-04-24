import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#FFE5B4] text-[#4D2600] shadow p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/refugio-logo.png" 
            alt="Logo del Refugio"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold font-serif">Corazones Peluditos</span>
        </Link>
        <nav className="space-x-4 text-lg">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/items" className="hover:underline">Mascotas</Link>
          <Link to="/items/create" className="hover:underline">Agregar</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header
