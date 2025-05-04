import React from "react";

const FormularioAuth = ({ form, handleChange, handleSubmit, isRegister }) => (
  <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
    {isRegister && (
      <>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Selector de tipo de usuario */}
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Selecciona tu rol</option>
          <option value="usuario">Adoptante</option>
          <option value="refugio">Refugio</option>
        </select>

        {/* Campo adicional si elige "refugio" */}
        {form.rol === "refugio" && (
          <input
            type="text"
            name="nombreRefugio"
            value={form.nombreRefugio}
            onChange={handleChange}
            placeholder="Nombre del Refugio"
            className="w-full border px-3 py-2 rounded"
            required
          />
        )}
      </>
    )}

    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Correo electrónico"
      className="w-full border px-3 py-2 rounded"
      required
    />

    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Contraseña"
      className="w-full border px-3 py-2 rounded"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      {isRegister ? "Registrarse" : "Iniciar sesión"}
    </button>
  </form>
);

export default FormularioAuth
