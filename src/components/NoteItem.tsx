import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Checkbox from "./Checkbox";
import { Text } from "./Text";

type Props = {
  isCompleted: boolean;
  title: string;
  onCheckboxPressed?: () => void;
  onDeletePressed?: () => void;
};
const NoteItem: React.FC<Props> = ({
  isCompleted = false,
  title = "Nota",
  onCheckboxPressed,
  onDeletePressed,
}) => {
  //   const [_isCompleted, setIsCompleted] = useState<boolean>(isCompleted);
  return (
    <View style={styles.container}>
      <Pressable onPress={onCheckboxPressed}>
        <Checkbox isChecked={isCompleted} />
      </Pressable>
      <Text
        style={[
          styles.title,
          {
            textDecorationLine: isCompleted ? "line-through" : "none",
          },
        ]}
      >
        {title}
      </Text>
      <View style={{ flex: 1 }} />
      <Pressable onPress={onDeletePressed}>
        <Feather name="x" size={20} />
      </Pressable>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 15,
  },
  title: {
    textDecorationLine: "line-through",
    fontSize: 20,
  },
});
