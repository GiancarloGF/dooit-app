import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TouchableOpacityProps;

const FloatingActionButton: React.FC<Props> = (props) => {
  const backgroundColor = useThemeColor(null, "floatingButton");
  const iconColor = useThemeColor(null, "background");
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      {...props}
    >
      <Feather name="plus" size={25} color={iconColor} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 70,
    borderRadius: 100,
  },
  // icon: {
  //   color: "red",
  // },
});
