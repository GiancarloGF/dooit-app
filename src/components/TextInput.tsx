import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from "react-native";

import { Text } from "./Text";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TextInputProps & {
  label: string;
  errorText?: string;
};

function TextInput({ label, errorText, ...props }: Props): React.JSX.Element {
  const borderColor = useThemeColor(undefined, "inputBorder");
  const textColor = useThemeColor(undefined, "text");
  return (
    <View style={styles.inputContainer}>
      <Text
        style={[styles.labelText, { color: errorText ? "red" : textColor }]}
      >
        {label}
      </Text>
      <RNTextInput
        // placeholder={placeholder}
        // placeholderTextColor={theme === "dark" ? "white" : "black"}
        selectionColor="red"
        style={[
          styles.input,
          {
            color: textColor,
            borderColor: errorText ? "red" : borderColor,
            // backgroundColor: isDarkMode ? 'black' : 'white',
          },
        ]}
        {...props}
        // value={value}
        // onChange={onChange}
        // keyboardType={keyboardType}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 5,
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default TextInput;
