import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Feather name="check-circle" size={48} color="#fff" />
      <Text style={[styles.logo, styles.text]}>Dooit</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
});
