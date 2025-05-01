import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useMascotaForm = ({ inicial = {}, onSubmit, isEdit = false, cargarMascota }) => {
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    descripcion: "",
    imagen: "",
    ...inicial,
  });

  useEffect(() => {
    if (isEdit && cargarMascota) {
      cargarMascota()
        .then((data) =>
          setForm({
            ...data,
            edad: String(data.edad),
          })
        )
        .catch(() => toast.error("Error al cargar la mascota"));
    }
  }, [isEdit, cargarMascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, especie, raza, edad } = form;

    if (!nombre || !especie || !raza || !edad) {
      toast.error("Todos los campos obligatorios deben estar completos");
      return;
    }

    if (nombre.length < 3 || especie.length < 3 || raza.length < 3) {
      toast.error("Nombre, especie y raza deben tener al menos 3 caracteres");
      return;
    }

    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
      toast.error("La edad debe ser un número en meses mayor que 0");
      return;
    }

    try {
      await onSubmit(form);
    } catch (error) {
      toast.error("Error al guardar la mascota");
    }
  };

  return { form, handleChange, handleSubmit };
};
