const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primaryColor = "#0F172A";
const secondaryColor = "#fff";
const ternaryColor = "#CBD5E1";

export default {
  primary: primaryColor,
  secondary: secondaryColor,
  ternary: ternaryColor,
  light: {
    primary: primaryColor,
    text: primaryColor,
    textAccent: secondaryColor,
    background: secondaryColor,
    backgroundAccent: primaryColor,
    floatingButton: primaryColor,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    inputBorder: "#CBD5E1",
  },
  dark: {
    primary: primaryColor,
    text: secondaryColor,
    textAccent: primaryColor,
    background: primaryColor,
    backgroundAccent: secondaryColor,
    floatingButton: secondaryColor,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    inputBorder: "#CBD5E1",
  },
};
