import { useState } from "react";
import { toast } from "react-toastify";

export const useAuthForm = ({ onSubmit, isRegister = false }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    ...(isRegister && { nombre: "" }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && !form.nombre) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (!form.email || !form.password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (form.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await onSubmit(form);
    } catch (error) {
      toast.error("Error al enviar los datos");
    }
  };

  return { form, handleChange, handleSubmit };
};
