import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "./Text";

import Colors from "@/constants/Colors";

type Props = {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
  onSelected?: () => void;
  color: string;
};
const DocumentItem: React.FC<Props> = ({
  title,
  description,
  iconName,
  onSelected,
  color,
}) => (
  <Pressable onPress={onSelected}>
    <View style={[styles.itemContainer, { backgroundColor: color }]}>
      <Feather name={iconName} size={24} color={Colors.primary} />
      <View style={styles.itemRight}>
        <Text style={styles.itemName}>{title}</Text>
        <Text style={styles.itemSummaryText}>{description}</Text>
      </View>
    </View>
  </Pressable>
);

export default DocumentItem;

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  itemRight: {},
  itemSummary: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  itemSummaryText: {
    color: Colors.primary,
  },
  itemName: {
    fontSize: 24,
    color: Colors.primary,
  },
});
