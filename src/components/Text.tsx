import { StyleSheet, Text as RNText } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeProps } from "@/types";

export type TextProps = ThemeProps & RNText["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <RNText style={[{ color }, styles.text, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  text: { fontFamily: "Comfortaa" },
});
