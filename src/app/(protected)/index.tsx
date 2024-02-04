import GorhomBottomSheet from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import BottomSheet from "@/components/BottomSheet";
import DocumentItem from "@/components/DocumentItem";
import FloatingActionButton from "@/components/FloatingActionButton";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useSession } from "@/providers/session_provider";

const HomeScreen = () => {
  const { signOut } = useSession();

  const bottomSheetRef = useRef<GorhomBottomSheet>(null);

  function onCreateFolder(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    bottomSheetRef.current?.expand();
  }

  function onSignOut() {
    signOut();
  }

  return (
    <>
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
        <FloatingActionButton onPress={onCreateFolder} />
      </ViewThemed>
      <BottomSheet
        buttonSheetRef={bottomSheetRef}
        content={<Text>Hola</Text>}
      />
    </>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f4511e",
  },
  sheetText: {
    color: Colors.primary,
  },
});
