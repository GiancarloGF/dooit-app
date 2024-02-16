import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

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

export default styles;
