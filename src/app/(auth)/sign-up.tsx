import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import Colors from "@/constants/Colors";
import { useSession } from "@/providers/session_provider";

const REQUIRED_ERROR_MSG = "Este campo es requerido";
const EMAIL_ERROR_MSG = "Debe ser un correo electrónico válido";

type SignUpResponse = {
  message: string;
  data: {
    token: string;
    userId: string;
  };
};

type FormData = {
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

export default function SignUpScreen() {
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const mutation = useMutation<
    SignUpResponse,
    Error,
    { password: string; email: string; username: string },
    unknown
  >({
    mutationFn: async (body) => {
      console.log("body", body);
      const response = await axios.post(
        "http://192.168.18.20:3000/auth/register",
        body,
      );

      return response.data;
    },
    onSuccess: (data) => {
      console.log("on success data", data);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      signIn(data.data.token, data.data.userId);

      Toast.show({
        type: "success",
        text1: data.message,
        text2: "Bienvenido 👋",
      });

      router.replace("/");
    },
  });

  const watchRepeatedPassword = watch("repeatedPassword");

  const onSubmit = (data: FormData) => {
    console.log("is form valid", isValid);
    if (!isValid) return;
    //hide keyboard
    Keyboard.dismiss();
    console.log("Form data", data);
    mutation.mutate({
      password: getValues("password"),
      email: getValues("email"),
      username: getValues("username"),
    });
  };

  function validatePasswords() {
    const { password, repeatedPassword } = getValues();

    if (repeatedPassword === "") return;

    if (password !== repeatedPassword) {
      setError("repeatedPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
    } else {
      clearErrors("repeatedPassword");
    }
  }

  useEffect(() => {
    console.log("repeatedPassword", watchRepeatedPassword);
    validatePasswords();
    // const subscription = watch((value, { name, type }) =>
    //   console.log(value, name, type),
    // );
    // return () => subscription.unsubscribe();
  }, [watchRepeatedPassword]);

  return (
    <ScrollView style={{ backgroundColor: Colors.primary }}>
      <SafeAreaView style={styles.mainView}>
        <View style={{ height: Platform.OS === "android" ? 40 : 0 }} />
        <Logo />
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Registro</Text>
            <Text style={styles.formSubTitle}>Crear nueva cuenta</Text>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nombre de usuario"
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={errors.username?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          <View style={{ height: 10 }} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                keyboardType="email-address"
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={errors.email?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <View style={{ height: 10 }} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contraseña"
                secureTextEntry
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={errors.password?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <View style={{ height: 10 }} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Repetir contraseña"
                secureTextEntry
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={errors.repeatedPassword?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="repeatedPassword"
          />
          <View style={{ height: 40 }} />
          <Button
            label="CREAR CUENTA"
            labelColor={Colors.primary}
            indicatorColor={Colors.primary}
            style={styles.formButton}
            onPress={handleSubmit(onSubmit)}
            isLoading={mutation.isPending}
          />
        </View>
        <Text style={styles.signInText}>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/sign-in" style={styles.link}>
            Iniciar Sesión
          </Link>
        </Text>
        <View style={{ height: 20 }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingTop: 30,
  },
  text: {
    color: "#fff",
    fontFamily: "Comfortaa",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  buttonLabel: {
    color: Colors.primary,
  },
  //FORM
  signInText: {
    color: Colors.ternary,
    marginTop: 20,
  },
  link: {
    color: Colors.secondary,
    fontFamily: "ComfortaaBold",
  },
  formContainer: {
    width: "90%",
    padding: 15,
    marginTop: 20,
  },
  formButton: {
    backgroundColor: "white",
  },
  formInput: {
    color: Colors.secondary,
  },
  errorText: {
    color: Colors.error,
  },
  formHeader: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "ComfortaaBold",
    color: Colors.secondary,
  },
  formSubTitle: {
    fontSize: 16,
    color: Colors.ternary,
  },
});
