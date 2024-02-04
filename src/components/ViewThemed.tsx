/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { View as RNView } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeProps } from "@/types";
export type ViewProps = ThemeProps & RNView["props"];

export function ViewThemed(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}
