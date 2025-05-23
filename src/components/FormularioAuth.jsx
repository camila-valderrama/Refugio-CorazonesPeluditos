import React from "react";

const FormularioAuth = ({
  register,
  handleSubmit,
  errors,
  isRegister,
  rolSeleccionado,
}) => {
  const rol = rolSeleccionado;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {isRegister && (
        <>
          <label className="text-sm font-semibold">Selecciona tu rol</label>
          <select
            {...register("rol")}
            defaultValue={rol || ""}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Elegí una opción --</option>
            <option value="usuario">Adoptante</option>
            <option value="refugio">Refugio</option>
          </select>

          {errors.rol && (
            <p className="text-red-500 text-sm">{errors.rol.message}</p>
          )}

          <input
            type="text"
            {...register("nombre")}
            placeholder={
              rol === "refugio" ? "Nombre del responsable" : "Nombre completo"
            }
            className="w-full border px-3 py-2 rounded"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}

          {rol === "refugio" && (
            <>
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
        </>
      )}

      <input
        type="email"
        {...register("email")}
        placeholder="Correo electrónico"
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
        className="w-full border px-3 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default FormularioAuth;
