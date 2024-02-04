import { Feather } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import FloatingActionButton from "@/components/FloatingActionButton";
import HeaderTitle from "@/components/HeaderTitle";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useThemeColor } from "@/hooks/useThemeColor";

const FolderScreen = () => {
  const router = useRouter();
  const { keyboardShown, hideKeyboard } = useKeyboard();

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

  function onItemPressed() {
    router.push("/notebook");
  }

  function onCreateNew(): void {
    // TODO: Implementar creación de libretas
    console.log("Crear Libreta");
    bottomSheetRef.current?.present();
  }

  return (
    <>
      <ViewThemed style={styles.mainView}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <HeaderTitle name="Mis Finanzas" type="Carpeta" />
            ),
          }}
        />
        <SectionHeader name="Libretas" />
        <View style={styles.listItemsContainer}>
          <Pressable onPress={onItemPressed}>
            <View
              style={[styles.itemContainer, { backgroundColor: "#D9FFDA" }]}
            >
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
            <View
              style={[styles.itemContainer, { backgroundColor: "#D9FFDA" }]}
            >
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
        <FloatingActionButton onPress={onCreateNew} />
      </ViewThemed>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPointsValues}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetContent
          closeBottomSheet={() => bottomSheetRef.current?.dismiss()}
          hideKeyboard={hideKeyboard}
        />
      </BottomSheetModal>
    </>
  );
};

export default FolderScreen;

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
        <Text style={styles.sheetHeaderTitle}>Nueva Libreta</Text>
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
});
