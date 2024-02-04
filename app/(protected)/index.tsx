import Feather from "@expo/vector-icons/Feather";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { ViewThemed } from "@/components/ViewThemed";
import { useSession } from "@/providers/session_provider";
import Colors from "@/constants/Colors";

const HomeScreen = () => {
  const { signOut } = useSession();
  return (
    <ViewThemed style={styles.mainView}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Dooit App",
          headerRight: () => (
            <Text style={styles.logoutText} onPress={() => signOut()}>
              Cerrar sesión
            </Text>
          ),
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          // headerStyle: { backgroundColor: "#f4511e" },
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Text style={styles.welcomeText}>👋 Hola, Giancarlo!</Text>
      <View style={styles.sectionHeader}>
        {/* <Feather name="folder" size={28} color={Colors.primary} /> */}
        <Text style={styles.sectionName}>Carpetas</Text>
      </View>
      <View style={styles.listItemsContainer}>
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
        <View style={[styles.itemContainer, { backgroundColor: "#FFEFD7" }]}>
          <Feather name="folder" size={24} color={Colors.primary} />
          <View style={styles.itemRight}>
            <Text style={styles.itemName}>Personal</Text>
            <View style={styles.itemSummary}>
              <Text style={styles.itemSummaryText}>4 Libretas</Text>
              <Text style={styles.itemSummaryText}>15 Notas</Text>
            </View>
          </View>
        </View>
      </View>
    </ViewThemed>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, padding: 10 },
  welcomeText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  sectionHeader: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  sectionName: {
    fontSize: 28,
  },
  logoutText: {
    color: "#fff",
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
