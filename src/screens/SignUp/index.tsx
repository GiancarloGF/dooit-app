import { Link } from "expo-router";
import { Controller } from "react-hook-form";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import styles from "./styles";
import useSignUpForm, { FormData } from "./useSignUpForm";
import useSignUpMutation from "./useSignUpMutation";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import TextInput from "@/components/TextInput";
import Colors from "@/constants/Colors";

export default function SignUpScreen() {
  const form = useSignUpForm();

  const mutation = useSignUpMutation();

  const onSubmit = (data: FormData) => {
    console.log("is form valid", form.isValid);
    if (!form.isValid) return;
    //hide keyboard
    Keyboard.dismiss();
    console.log("Form data", data);
    mutation.mutate({
      password: form.getValues("password"),
      email: form.getValues("email"),
      username: form.getValues("username"),
    });
  };

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
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nombre de usuario"
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={form.errors.username?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          <View style={{ height: 10 }} />
          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                keyboardType="email-address"
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
          <View style={{ height: 10 }} />
          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Repetir contraseña"
                secureTextEntry
                labelColor={Colors.ternary}
                selectionColor={Colors.ternary}
                style={styles.formInput}
                errorText={form.errors.repeatedPassword?.message}
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
            onPress={form.handleSubmit(onSubmit)}
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
