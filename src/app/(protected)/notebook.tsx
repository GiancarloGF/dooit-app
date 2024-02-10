import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import FloatingActionButton from "@/components/FloatingActionButton";
import HeaderTitle from "@/components/HeaderTitle";
import Modal from "@/components/Modal";
import NoteItem from "@/components/NoteItem";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Note",
    isCompleted: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Note",
    isCompleted: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Note",
    isCompleted: true,
  },
];

const NoteBookScreen = () => {
  const [notes, setNotes] = React.useState(DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function onCompleteNote(noteId: string): void {
    // TODO: Implementar creación de carpetas
    console.log("Completar nota" + noteId);
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, isCompleted: !note.isCompleted };
      }
      return note;
    });

    setNotes(newNotes);
  }

  function onDeleteNote(noteId: string): void {
    // TODO: Implementar creación de carpetas
    console.log("Eliminar nota" + noteId);
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
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
            headerTitle: () => (
              <HeaderTitle name="Gastos Diarios" type="Libreta" />
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
        <SectionHeader name="Notas" />
        <FlatList
          data={notes}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          renderItem={({ item }) => (
            <NoteItem
              isCompleted={item.isCompleted}
              title={item.title}
              onCheckboxPressed={() => onCompleteNote(item.id)}
              onDeletePressed={() => onDeleteNote(item.id)}
            />
          )}
        />
        {/* <Text>NoteBookScreen</Text>
        <View style={styles.listItemsContainer}>
          <DocumentItem />
          <DocumentItem />
        </View> */}
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      {isOpen ? (
        <CustomBottomSheet onCloseBottomSheet={() => setIsOpen(false)} />
      ) : null}
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <AlertDialog
          onConfirm={() => setModalVisible(false)}
          onDismiss={() => setModalVisible(false)}
          title="¿Deseas eliminar esta libreta?"
          description="Esta acción no se puede deshacer"
          confirmButtonLabel="Si, Eliminar"
          dismissButtonLabel="No, Cancelar"
        />
      </Modal>
    </>
  );
};

export default NoteBookScreen;

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
        <Feather name="folder-plus" size={24} color={Colors.primary} />
        <Text style={styles.sheetHeaderTitle}>Nueva Nota</Text>
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
        labelColor="white"
        style={{ backgroundColor: Colors.primary }}
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
  listContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
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
  deleteButton: {
    padding: 15,
    borderRadius: 100,
  },
});
