import React from "react";

const FormularioAuth = ({ register, handleSubmit, errors, isRegister }) => (
  <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

    {/* Campo Nombre */}
    {isRegister && (
      <>
        <input
          type="text"
          {...register("nombre")}
          placeholder="Nombre completo"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

        {/* Selector de rol */}
        <select
          {...register("rol")}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Selecciona tu rol</option>
          <option value="usuario">Adoptante</option>
          <option value="refugio">Refugio</option>
        </select>
        {errors.rol && <p className="text-red-500 text-sm">{errors.rol.message}</p>}

        {/* Campo nombre del refugio solo si elige "refugio" */}
        {/* Este input puede mostrarse con lógica desde el formulario padre si se quiere condicionar visualmente */}
        <input
          type="text"
          {...register("nombreRefugio")}
          placeholder="Nombre del Refugio"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.nombreRefugio && (
          <p className="text-red-500 text-sm">{errors.nombreRefugio.message}</p>
        )}
      </>
    )}

    {/* Email */}
    <input
      type="email"
      {...register("email")}
      placeholder="Correo electrónico"
      className="w-full border px-3 py-2 rounded"
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

    {/* Contraseña */}
    <input
      type="password"
      {...register("password")}
      placeholder="Contraseña"
      className="w-full border px-3 py-2 rounded"
    />
    {errors.password && (
      <p className="text-red-500 text-sm">{errors.password.message}</p>
    )}

    {/* Botón */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      {isRegister ? "Registrarse" : "Iniciar sesión"}
    </button>
  </form>
);

export default FormularioAuth;
