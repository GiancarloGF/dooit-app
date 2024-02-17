import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FlatList, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import styles from "./styles";
import useCreateNote from "./useCreateNote";
import useCreateNoteForm from "./useCreateNoteForm";
import useDeleteNotebook from "./useDeleteNotebook";
import useGetNotebook from "./useGetNotebook";

import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import DocumentItemsSkeleton from "@/components/DocumentItemSkeleton";
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
import { useSession } from "@/providers/session_provider";
import { Notebook } from "@/types/notebook";

const NoteBookScreen = ({ notebookId }: { notebookId: string }) => {
  const { userId } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { notebook, isLoading } = useGetNotebook({
    notebookId,
  });

  const mutation = useDeleteNotebook({
    notebookId,
    closeModal: () => {
      setModalVisible(false);
    },
  });

  function onFloatingButtonPressed(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    // bottomSheetRef.current?.present();
    setIsOpen(true);
  }

  function onDeleteButtonPressed(): void {
    setModalVisible(true);
  }

  function deleteNotebook(): void {
    mutation.mutate({
      userId: userId!,
    });
  }

  return (
    <>
      <ViewThemed style={styles.mainView}>
        <Stack.Screen
          options={{
            animation: "slide_from_right",
            headerTitle: () => (
              <HeaderTitle name={notebook?.name ?? "Libreta"} type="Libreta" />
            ),
            headerRight: () => (
              <TouchableHighlight
                onPress={onDeleteButtonPressed}
                style={styles.deleteButton}
                underlayColor="#CBD5E1"
              >
                <Feather name="trash" size={20} color={Colors.secondary} />
              </TouchableHighlight>
            ),
          }}
        />
        <SectionHeader name="Notas" />
        <DocumentItemsSkeleton show={isLoading} />
        <FlatList
          data={notebook?.notes ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          style={styles.listContainer}
          renderItem={({ item }) => <NoteItem note={item} />}
        />
        {notebook?.notes?.length === 0 && (
          <View
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: Colors.ternary,
                paddingBottom: 50,
              }}
            >
              Aun no tienes notas
            </Text>
          </View>
        )}
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      {notebook && isOpen ? (
        <CustomBottomSheet
          notebook={notebook}
          onCloseBottomSheet={() => setIsOpen(false)}
        />
      ) : null}
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <AlertDialog
          onConfirm={deleteNotebook}
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
  notebook,
  onCloseBottomSheet,
}: {
  notebook: Notebook;
  onCloseBottomSheet: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { keyboardShown, hideKeyboard } = useKeyboard();
  const { userId } = useSession();

  const mutation = useCreateNote({
    closeModal: () => {
      bottomSheetRef.current?.close();
      onCloseBottomSheet();
    },
  });

  const form = useCreateNoteForm();

  function onSubmit() {
    if (!form.isValid) return;

    hideKeyboard();

    mutation.mutate({
      description: form.getValues("name"),
      isCompleted: false,
      userId: userId!,
      notebookId: notebook._id,
      folderId: notebook.folder,
    });
  }
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
      <View style={styles.sheetContainer}>
        <View style={styles.sheetHeader}>
          <Feather name="plus-square" size={24} color={Colors.primary} />
          <Text style={styles.sheetHeaderTitle}>Nueva Nota</Text>
        </View>
        <View style={styles.sheetContent}>
          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nombre"
                labelColor={Colors.primary}
                selectionColor={Colors.primary}
                style={{ color: Colors.primary }}
                errorText={form.errors.name?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
        </View>
        <Button
          label="Crear"
          isLoading={mutation.isPending}
          disabled={!form.isValid}
          onPress={form.handleSubmit(onSubmit)}
          labelColor="white"
          style={{ backgroundColor: Colors.primary }}
        />
      </View>
    </BottomSheet>
  );
};
