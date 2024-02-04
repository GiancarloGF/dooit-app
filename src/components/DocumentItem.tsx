import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import { Text } from "./Text";

const DocumentItem = () => {
  const router = useRouter();

  function onItemPressed() {
    router.push("/folder");
  }

  return (
    <Pressable onPress={onItemPressed}>
      <View style={[styles.itemContainer, { backgroundColor: "#D9FFDA" }]}>
        <Feather name="folder" size={24} color={Colors.primary} />
        <View style={styles.itemRight}>
          <Text style={styles.itemName}>Finanzas</Text>
          <View style={styles.itemSummary}>
            <Text style={styles.itemSummaryText}>4 Libretas</Text>
            <Text style={styles.itemSummaryText}>15 Notas</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

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
