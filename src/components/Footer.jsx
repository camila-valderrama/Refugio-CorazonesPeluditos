import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4C9FEC] text-white text-center py-6 px-4 mt-10">
      <div className="max-w-4xl mx-auto space-y-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Corazones Peluditos. Todos los derechos reservados.
        </p>
        <div className="flex justify-center gap-6 text-xl">
          <a href="tel:1234567890" className="hover:text-blue-900" title="Teléfono">
            <i className="bi bi-telephone-fill"></i>
          </a>
          <a href="mailto:contacto@corazonespeluditos.org" className="hover:text-blue-900" title="Email">
            <i className="bi bi-envelope-fill"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900" title="Instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer
