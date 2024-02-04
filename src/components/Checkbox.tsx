import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";

type Props = {
  isChecked?: boolean;
};
const Checkbox: React.FC<Props> = ({ isChecked = false }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isChecked ? Colors.primary : "transparent" },
      ]}
    >
      <Feather
        name="check"
        size={16}
        style={{
          color: isChecked ? "white" : "transparent",
        }}
      />
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 2,
  },
});
