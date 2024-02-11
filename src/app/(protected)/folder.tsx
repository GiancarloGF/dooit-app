import { Feather } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import FloatingActionButton from "@/components/FloatingActionButton";
import HeaderTitle from "@/components/HeaderTitle";
import Modal from "@/components/Modal";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";

const FolderScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  function onItemPressed() {
    router.push("/notebook");
  }

  function onFloatingButtonPressed(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    // bottomSheetRef.current?.present();
    setIsOpen(true);
  }

  function onDelete(): void {
    setModalVisible(true);
  }

  return (
    <>
      <ViewThemed style={styles.mainView}>
        <Stack.Screen
          options={{
            animation: "slide_from_right",
            headerTitle: () => (
              <HeaderTitle name="Mis Finanzas" type="Carpeta" />
            ),
            headerRight: () => (
              <TouchableHighlight
                onPress={onDelete}
                style={styles.deleteButton}
                underlayColor="#CBD5E1"
              >
                <Feather name="trash" size={20} color={Colors.secondary} />
              </TouchableHighlight>
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
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      {/* <BottomSheetModal
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
      </BottomSheetModal> */}
      {isOpen ? (
        <CustomBottomSheet onCloseBottomSheet={() => setIsOpen(false)} />
      ) : null}
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <AlertDialog
          onConfirm={() => setModalVisible(false)}
          onDismiss={() => setModalVisible(false)}
          title="¿Deseas eliminar esta carpeta?"
          description="Esta acción no se puede deshacer"
          confirmButtonLabel="Si, Eliminar"
          dismissButtonLabel="No, Cancelar"
        />
      </Modal>
    </>
  );
};

export default FolderScreen;

const CustomBottomSheet = ({
  onCloseBottomSheet,
}: {
  onCloseBottomSheet: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { keyboardShown, hideKeyboard } = useKeyboard();
  const snapPointsValues = useMemo(() => {
    if (keyboardShown) {
      return ["65%"];
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
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPointsValues}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: "#fff" }}
      onChange={(index) => {
        if (index === -1) {
          onCloseBottomSheet();
        }
      }}
    >
      <BottomSheetContent
        closeBottomSheet={() => {
          bottomSheetRef.current?.collapse();
          onCloseBottomSheet();
        }}
        hideKeyboard={hideKeyboard}
      />
    </BottomSheet>
  );
};

const BottomSheetContent = ({
  closeBottomSheet,
  hideKeyboard,
}: {
  closeBottomSheet: () => void;
  hideKeyboard: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { hideKeyboard } = useKeyboard();

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
        <Feather name="file-plus" size={24} color={Colors.primary} />
        <Text style={styles.sheetHeaderTitle}>Nueva Libreta</Text>
      </View>
      <View style={styles.sheetContent}>
        <TextInput
          label="Nombre"
          errorText={undefined}
          labelColor={Colors.primary}
        />
      </View>
      {/* <View style={{ flex: 1 }} /> */}
      <Button
        label="Crear"
        isLoading={isLoading}
        onPress={onCreate}
        style={{ backgroundColor: Colors.primary }}
        labelColor="white"
      />
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
    color: Colors.primary,
  },
  sheetContent: {
    flex: 1,
    padding: 10,
  },
  sheetText: {
    color: Colors.primary,
  },
  deleteButton: {
    padding: 15,
    borderRadius: 100,
  },
  //Modal
});
