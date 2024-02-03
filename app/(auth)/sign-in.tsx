// import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
// import { useSession } from "@/providers/session_provider";

export default function SignIn() {
  // const { signIn } = useSession();
  return (
    <View style={styles.mainView}>
      {/* <Text
        style={styles.text}
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text> */}

      <Text style={[styles.logo, styles.text]}>Dooit</Text>
      <Text style={[styles.slogan, styles.text]}>Tus notas, tu app.</Text>
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
    fontSize: 20,
  },
});
