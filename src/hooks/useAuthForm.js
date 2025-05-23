import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const getEsquema = (isRegister) =>
  yup.object().shape({
    ...(isRegister && {
      nombre: yup
        .string()
        .required("El nombre es obligatorio")
        .min(3, "Debe tener al menos 3 caracteres"),
    }),
    email: yup
      .string()
      .required("El correo es obligatorio")
      .email("Debe ser un correo válido"),
    password: yup
      .string()
      .required("La contraseña es obligatoria")
      .min(6, "Debe tener al menos 6 caracteres"),
    ...(isRegister && {
      rol: yup
        .string()
        .oneOf(["usuario", "refugio"], "Debe seleccionar un rol")
        .required("El rol es obligatorio"),
      nombreRefugio: yup.string().when("rol", {
        is: "refugio",
        then: (schema) =>
          schema
            .required("El nombre del refugio es obligatorio")
            .min(3, "Debe tener al menos 3 caracteres"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  });

export const useAuthForm = ({ onSubmit, isRegister = false, defaultValues = {} }) => {
  const esquema = getEsquema(isRegister);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(esquema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      rol: "", 
      nombreRefugio: "",
      ...defaultValues,
    },
  });

  const rolSeleccionado = watch("rol");

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error("Error al enviar el formulario");
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onFormSubmit),
    errors,
    rolSeleccionado,
  };
};
