import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MascotasContext } from "../context/MascotasContext";
import ItemCard from "../components/ItemCard";

export const Home = () => {
  const { mascotas } = useContext(MascotasContext);
  const destacadas = mascotas.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-16 font-serif text-[#4D2600]">

      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-2 text-[#8B4513]">
          Bienvenido a Corazones Peluditos <i className="bi bi-heart-fill text-[#FF6B6B]"></i>
        </h1>
        <p className="text-lg text-[#5C4033]">
          Cada huella cuenta, cada historia merece un hogar.
        </p>
      </section>

      {/* Sección de perfiles */}
      <section className="text-center mb-12 space-y-6">
        <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
          ¿Cómo querés comenzar?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/items")}
            className="bg-[#FFDAB9] p-6 rounded-lg shadow hover:bg-[#FFC589] transition flex flex-col items-center"
          >
            <i className="bi bi-search-heart-fill text-3xl text-[#FF6B6B] mb-2"></i>
            <span className="text-lg font-semibold">Ver Mascotas</span>
            <p className="text-sm mt-1 text-[#5C4033]">Conocé a quienes buscan un hogar</p>
          </button>

          <button
            onClick={() => navigate("/login?tipo=usuario")}
            className="bg-[#FFE4C4] p-6 rounded-lg shadow hover:bg-[#FFD1A1] transition flex flex-col items-center"
          >
            <i className="bi bi-person-circle text-3xl text-[#A0522D] mb-2"></i>
            <span className="text-lg font-semibold">Soy Adoptante</span>
            <p className="text-sm mt-1 text-[#5C4033]">Accedé a tu perfil o registrate</p>
          </button>

          <button
            onClick={() => navigate("/login?tipo=refugio")}
            className="bg-[#FFF5E1] p-6 rounded-lg shadow hover:bg-[#FFE9C9] transition flex flex-col items-center"
          >
            <i className="bi bi-house-heart-fill text-3xl text-[#DE6E00] mb-2"></i>
            <span className="text-lg font-semibold">Soy Refugio</span>
            <p className="text-sm mt-1 text-[#5C4033]">Publicá mascotas y gestioná tu espacio</p>
          </button>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="bg-[#FFF5E1] p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-2 text-[#8B4513]">
          <i className="bi bi-info-circle-fill mr-2 text-[#FFA500]"></i>Sobre Nosotros
        </h2>
        <p className="text-[#5C4033] leading-relaxed">
          En Corazones Peluditos trabajamos día a día para encontrarle un hogar lleno de amor a cada animalito rescatado.
          Nuestro refugio se dedica al cuidado, recuperación y adopción responsable de mascotas abandonadas.
          Creemos que todos merecen una segunda oportunidad. <i className="bi bi-heart text-[#FF6B6B]"></i>
        </p>
      </section>

      {/* Contacto */}
      <section className="p-6 bg-[#FFFDF5] rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-2 text-[#8B4513]">
          <i className="bi bi-telephone-fill mr-2 text-[#2E8B57]"></i>Contacto
        </h2>
        <ul className="text-[#5C4033] space-y-1">
          <li><i className="bi bi-telephone"></i> Teléfono: (123) 456-7890</li>
          <li><i className="bi bi-envelope"></i> Email: contacto@corazonespeluditos.org</li>
          <li><i className="bi bi-geo-alt"></i> Dirección: Calle Ficticia 123, Ciudad Refugio</li>
        </ul>
      </section>
    </div>
  );
};
