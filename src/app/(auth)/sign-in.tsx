import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import Colors from "@/constants/Colors";
import { useSession } from "@/providers/session_provider";

const REQUIRED_ERROR_MSG = "Este campo es requerido";
const EMAIL_ERROR_MSG = "Debe ser un correo electrónico válido";
type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required(REQUIRED_ERROR_MSG).email(EMAIL_ERROR_MSG),
    password: yup.string().required(REQUIRED_ERROR_MSG),
  })
  .required();

export default function SignIn() {
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "¡Ingreso exitoso!",
      text2: "Bienvenido 👋",
    });
  };

  const onSubmit = (data: FormData) => {
    if (!isValid) return;
    //hide keyboard
    Keyboard.dismiss();
    console.log("Form data", data);
    signIn();
    showToast();
    //TODO: agregar snack notificación de inicio de sesión
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  return (
    <View style={styles.mainView}>
      <Logo />
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Inicio de sesión</Text>
          <Text style={styles.formSubTitle}>Ingresa tus credenciales</Text>
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
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

        <View style={{ height: 40 }} />
        <Button
          label="INICIAR SESIÓN"
          labelColor={Colors.primary}
          style={styles.formButton}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={{ height: 10 }} />
      <Text style={styles.signUpText}>
        ¿No tienes una cuenta?{"  "}
        <Link href="/sign-up" style={styles.link}>
          Registrarse
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  text: {
    color: "#fff",
    fontFamily: "Comfortaa",
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
  signUpText: {
    color: Colors.ternary,
    marginTop: 20,
  },
  link: {
    color: Colors.secondary,
    fontFamily: "ComfortaaBold",
  },
  formContainer: {
    width: "90%",
    padding: 20,
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
