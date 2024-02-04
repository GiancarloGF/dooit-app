import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import DocumentItem from "@/components/DocumentItem";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { ViewThemed } from "@/components/ViewThemed";
import { useSession } from "@/providers/session_provider";

const HomeScreen = () => {
  const { signOut } = useSession();

  function onSignOut() {
    signOut();
  }

  return (
    <ViewThemed style={styles.mainView}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Dooit App",
          headerRight: () => (
            <Text style={styles.logoutText} onPress={onSignOut}>
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
      <SectionHeader name="Carpetas" />
      <View style={styles.listItemsContainer}>
        <DocumentItem />
        <DocumentItem />
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
});
