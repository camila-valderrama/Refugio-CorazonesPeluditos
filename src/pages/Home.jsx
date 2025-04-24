import { Link } from "react-router-dom"; 
import { useContext } from "react";
import { MascotasContext } from "../context/MascotasContext";

export const Home = () => {
  const { mascotas } = useContext(MascotasContext);
  const destacadas = mascotas.slice(0, 3);

  return (
    <div className="p-6 space-y-16 font-serif text-[#4D2600]">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-2 text-[#8B4513]">
          Bienvenido a Corazones Peluditos <i className="bi bi-heart-fill text-[#FF6B6B]"></i>
        </h1>
        <p className="text-lg text-[#5C4033]">Cada huella cuenta, cada historia merece un hogar.</p>
      </section>

      {/* Mascotas destacadas */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#A0522D]">
          Mascotas en adopción destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacadas.map((m) => (
            <div
              key={m.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              {m.imagen && (
                <img
                  src={m.imagen}
                  alt={`Foto de ${m.nombre}`}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{m.nombre}</h3>
              <p className="text-[#5C4033]">{m.raza} · {m.especie}</p>
              <p className="text-sm text-[#8B5E3C]">Edad: {m.edad} años</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/items"
            className="inline-block bg-[#FFB347] hover:bg-[#FFA500] text-white px-4 py-2 rounded"
          >
            Ver todas las mascotas <i className="bi bi-arrow-right-circle-fill ml-1"></i>
          </Link>
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
          Creemos que todos merecen una segunda oportunidad <i className="bi bi-heart text-[#FF6B6B]"></i>
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
