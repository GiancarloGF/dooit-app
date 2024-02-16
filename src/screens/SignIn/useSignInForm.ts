import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { EMAIL_ERROR_MSG, REQUIRED_ERROR_MSG } from "@/constants/strings";

export type SignInFormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required(REQUIRED_ERROR_MSG).email(EMAIL_ERROR_MSG),
    password: yup.string().required(REQUIRED_ERROR_MSG),
  })
  .required();

export default function useSignInForm() {
  const {
    formState: { errors, isValid, isDirty },
    ...form
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    isValid,
    errors,
    isDirty,
    ...form,
  };
}
