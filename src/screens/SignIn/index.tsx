import { Link } from "expo-router";
import { Controller } from "react-hook-form";
import { Keyboard, Text, View } from "react-native";

import styles from "./styles";
import useSignInForm, { SignInFormData } from "./useSignInForm";
import useSignInMutation from "./useSignInMutation";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import Colors from "@/constants/Colors";

export default function SignInScreen() {
  const form = useSignInForm();

  const mutation = useSignInMutation();

  const onSubmit = (data: SignInFormData) => {
    if (!form.isValid) return;
    //hide keyboard
    Keyboard.dismiss();
    console.log("Form data", data);
    mutation.mutate({
      password: form.getValues("password"),
      email: form.getValues("email"),
    });
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
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              labelColor={Colors.ternary}
              selectionColor={Colors.ternary}
              style={styles.formInput}
              errorText={form.errors.email?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />

        <View style={{ height: 10 }} />
        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Contraseña"
              secureTextEntry
              labelColor={Colors.ternary}
              selectionColor={Colors.ternary}
              style={styles.formInput}
              errorText={form.errors.password?.message}
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
          indicatorColor={Colors.primary}
          style={styles.formButton}
          onPress={form.handleSubmit(onSubmit)}
          isLoading={mutation.isPending}
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
