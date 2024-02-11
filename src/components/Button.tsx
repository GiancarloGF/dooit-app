import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { Text } from "./Text";

import { useThemeColor } from "@/hooks/useThemeColor";

type ButtonProps = TouchableOpacityProps & {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  labelColor?: string;
  indicatorColor?: string;
};

function Button({
  onPress,
  label,
  isLoading = false,
  disabled = false,
  labelColor,
  indicatorColor,
  style,
}: ButtonProps): React.JSX.Element {
  const isDisabled = onPress === undefined || disabled;
  const backgroundColor = useThemeColor(undefined, "backgroundAccent");
  const themedLabelColor = useThemeColor(undefined, "textAccent");

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: isDisabled ? "gray" : backgroundColor,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor ?? themedLabelColor} />
      ) : (
        <Text style={[styles.label, { color: labelColor ?? themedLabelColor }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
    // marginBottom: 5,
  },
  button: {
    // backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 5,
    // opacity: 1,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default Button;
