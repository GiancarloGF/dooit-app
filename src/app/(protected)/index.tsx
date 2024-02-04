import Feather from "@expo/vector-icons/Feather";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import DocumentItem from "@/components/DocumentItem";
import FloatingActionButton from "@/components/FloatingActionButton";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/providers/session_provider";

const HomeScreen = () => {
  const { signOut } = useSession();
  const { keyboardShown, hideKeyboard } = useKeyboard();
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPointsValues = useMemo(() => {
    if (keyboardShown) {
      return ["55%"];
    } else {
      return ["35%"];
    }
  }, [keyboardShown]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior="close"
        {...props}
      />
    ),
    [],
  );

  function onFloatingButtonPressed(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    bottomSheetRef.current?.present();
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
            title: "Dooit App",
            headerRight: () => (
              <Text style={styles.logoutText} onPress={onSignOut}>
                Cerrar sesión
              </Text>
            ),
          }}
        />
        <Text style={styles.welcomeText}>👋 Hola, Giancarlo!</Text>
        <SectionHeader name="Carpetas" />
        <View style={styles.listItemsContainer}>
          <DocumentItem />
          <DocumentItem />
        </View>
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPointsValues}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
      >
        <BottomSheetContent
          closeBottomSheet={() => bottomSheetRef.current?.dismiss()}
          hideKeyboard={hideKeyboard}
        />
      </BottomSheetModal>
    </>
  );
};

export default HomeScreen;

const BottomSheetContent = ({
  closeBottomSheet,
  hideKeyboard,
}: {
  closeBottomSheet: () => void;
  hideKeyboard: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { hideKeyboard } = useKeyboard();
  const color = useThemeColor(undefined, "text");

  function onCreate() {
    setIsLoading(true);
    hideKeyboard();

    setTimeout(() => {
      setIsLoading(false);
      closeBottomSheet();
    }, 1000);
  }

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.sheetHeader}>
        <Feather name="folder-plus" size={24} color={color} />
        <Text style={styles.sheetHeaderTitle}>Nueva Carpeta</Text>
      </View>
      <View style={styles.sheetContent}>
        <TextInput label="Nombre" errorText={undefined} />
      </View>
      {/* <View style={{ flex: 1 }} /> */}
      <Button label="Crear" isLoading={isLoading} onPress={onCreate} />
    </View>
  );
};

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
  sheetContainer: {
    flex: 1,
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sheetHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  sheetHeaderTitle: {
    fontSize: 20,
  },
  sheetContent: {
    flex: 1,
    padding: 10,
  },
  sheetText: {
    color: Colors.primary,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
