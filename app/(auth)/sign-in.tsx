import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";
import { useSession } from "@/providers/session_provider";

export default function SignIn() {
  const { signIn } = useSession();
  function onSignIn() {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  }

  return (
    <View style={styles.mainView}>
      <Feather name="check-circle" size={48} color="#fff" />
      <Text style={[styles.logo, styles.text]}>Dooit</Text>
      <Text style={[styles.slogan, styles.text]}>Tus notas, tu app</Text>
      <TouchableOpacity onPress={onSignIn} style={styles.button}>
        <AntDesign name="google" size={20} color={Colors.primary} />
        <Text style={styles.buttonLabel}>Continuar con Google</Text>
      </TouchableOpacity>
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
  logo: {
    fontSize: 48,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: 18,
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
});
