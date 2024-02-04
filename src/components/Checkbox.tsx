import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  isChecked?: boolean;
};
const Checkbox: React.FC<Props> = ({ isChecked = false }) => {
  const mainColor = useThemeColor(undefined, "text");
  const secondaryColor = useThemeColor(undefined, "background");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isChecked ? mainColor : "transparent",
          borderColor: mainColor,
        },
      ]}
    >
      <Feather
        name="check"
        size={16}
        style={{
          color: isChecked ? secondaryColor : "transparent",
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

    padding: 2,
  },
});
