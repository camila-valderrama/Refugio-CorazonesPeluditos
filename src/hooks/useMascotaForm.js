import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// Esquema de validación (basado en el schema de Mongoose)
const esquemaMascota = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
  especie: yup.string().required("La especie es obligatoria").min(3, "Debe tener al menos 3 caracteres"),
  raza: yup.string().notRequired().min(3, "Debe tener al menos 3 caracteres"),
  edad: yup
    .number()
    .typeError("La edad debe ser un número")
    .required("La edad es obligatoria")
    .positive("La edad debe ser mayor que 0")
    .integer("La edad debe ser un número entero"),
  descripcion: yup.string().notRequired(),
  imagen: yup.string().url("Debe ser una URL válida").notRequired(),
});

export const useMascotaForm = ({ isEdit = false, cargarMascota, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(esquemaMascota),
    defaultValues: {
      nombre: "",
      especie: "",
      raza: "",
      edad: null,
      descripcion: "",
      imagen: "",
    },
  });

  useEffect(() => {
    if (isEdit && cargarMascota) {
      cargarMascota()
        .then((data) => {
          Object.entries(data).forEach(([key, value]) => {
            if (key in esquemaMascota.fields) {
              setValue(key, value);
            }
          });
        })
        .catch(() => toast.error("Error al cargar la mascota"));
    }
  }, [isEdit, cargarMascota, setValue]);

  const onFormSubmit = async (datos) => {
    try {
      await onSubmit(datos);
    } catch (error) {
      toast.error("Error al guardar la mascota");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onFormSubmit),
    errors,
  };
};
