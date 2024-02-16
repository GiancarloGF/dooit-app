import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { EMAIL_ERROR_MSG, REQUIRED_ERROR_MSG } from "@/constants/strings";

const REPEATED_PASSWORD_KEY = "repeatedPassword";

export type FormData = {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

const schema = yup
  .object({
    username: yup.string().required(REQUIRED_ERROR_MSG),
    email: yup.string().required(REQUIRED_ERROR_MSG).email(EMAIL_ERROR_MSG),
    password: yup.string().required(REQUIRED_ERROR_MSG),
    repeatedPassword: yup.string().required(REQUIRED_ERROR_MSG),
  })
  .required();

export default function useSignUpForm() {
  const {
    formState: { errors, isValid, isDirty },
    ...form
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const watchRepeatedPassword = form.watch(REPEATED_PASSWORD_KEY);

  function validatePasswords() {
    const { password, repeatedPassword } = form.getValues();

    if (repeatedPassword === "") return;

    if (password !== repeatedPassword) {
      form.setError(REPEATED_PASSWORD_KEY, {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
    } else {
      form.clearErrors(REPEATED_PASSWORD_KEY);
    }
  }

  useEffect(() => {
    console.log(REPEATED_PASSWORD_KEY, watchRepeatedPassword);
    validatePasswords();
  }, [watchRepeatedPassword]);

  return {
    isValid,
    errors,
    isDirty,
    ...form,
  };
}
