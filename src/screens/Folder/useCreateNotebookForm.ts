import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export type CreateNotebookFormData = {
  name: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "Longitud mínima 3 caracteres"),
  })
  .required();

export default function useCreateNotebookForm() {
  const {
    formState: { errors, isValid, isDirty },
    ...form
  } = useForm<CreateNotebookFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  return {
    isValid,
    errors,
    isDirty,
    ...form,
  };
}
