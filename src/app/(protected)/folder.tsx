import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import HeaderTitle from "@/components/HeaderTitle";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import FloatingActionButton from "@/components/FloatingActionButton";

const FolderScreen = () => {
  const router = useRouter();

  function onItemPressed() {
    router.push("/notebook");
  }

  return (
    <ViewThemed style={styles.mainView}>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle name="Mis Finanzas" type="Carpeta" />,
        }}
      />
      <SectionHeader name="Libretas" />
      <View style={styles.listItemsContainer}>
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
        <Pressable onPress={onItemPressed}>
          <View style={[styles.itemContainer, { backgroundColor: "#D9FFDA" }]}>
            <Feather name="folder" size={24} color={Colors.primary} />
            <View style={styles.itemRight}>
              <Text style={styles.itemName}>Personal</Text>
              <View style={styles.itemSummary}>
                <Text style={styles.itemSummaryText}>4 Libretas</Text>
                <Text style={styles.itemSummaryText}>15 Notas</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
      <FloatingActionButton />
    </ViewThemed>
  );
};

export default FolderScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
  },

  listItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
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
