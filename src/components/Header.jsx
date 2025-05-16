import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, cerrarSesion, nombreRefugio } = useAuth();

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

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

        <button onClick={toggleMenu} className="lg:hidden text-3xl">
          <i className="bi bi-list"></i>
        </button>

        <div className={`flex-col lg:flex-row lg:flex lg:items-center lg:space-x-6 absolute lg:static top-20 left-0 w-full lg:w-auto bg-[#FFE5B4] p-4 lg:p-0 shadow-md lg:shadow-none ${menuAbierto ? "flex" : "hidden"}`}>
          <nav className="flex flex-col lg:flex-row lg:space-x-4 text-lg">
            <Link to="/" className="block py-2 px-4 hover:underline" onClick={toggleMenu}>Inicio</Link>
            <Link to="/items" className="block py-2 px-4 hover:underline" onClick={toggleMenu}>Mascotas</Link>

            {user?.rol === "refugio" && (
              <Link to="/items/create" className="block py-2 px-4 hover:underline" onClick={toggleMenu}>
                Agregar
              </Link>
            )}
            {user?.rol === "usuario" && (
              <Link to="/refugios" className="block py-2 px-4 hover:underline" onClick={toggleMenu}>
                Refugios
              </Link>
            )}
          </nav>

          <div className="flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0 items-center">
            {user ? (
              <>
                <span className="text-sm font-medium italic px-3">
                  {user.rol === "refugio" ? nombreRefugio : user.nombre}
                </span>
                <button
                  onClick={() => {
                    cerrarSesion();
                    setMenuAbierto(false);
                  }}
                  className="bg-white text-[#4D2600] px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center gap-1"
                >
                  <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-[#4D2600] px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center gap-1"
                  onClick={toggleMenu}
                >
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#4D2600] text-white px-4 py-2 rounded hover:bg-[#3b1f00] text-sm flex items-center gap-1"
                  onClick={toggleMenu}
                >
                  <i className="bi bi-person-plus"></i> Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
