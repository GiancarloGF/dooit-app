import { Feather } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import styles from "./styles";
import useCreateNotebook from "./useCreateNotebook";
import useCreateNotebookForm from "./useCreateNotebookForm";
import useDeleteFolder from "./useDeleteFolder";
import useGetFolder from "./useGetFolder";

import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import DocumentItem from "@/components/DocumentItem";
import DocumentItemsSkeleton from "@/components/DocumentItemSkeleton";
import FloatingActionButton from "@/components/FloatingActionButton";
import HeaderTitle from "@/components/HeaderTitle";
import Modal from "@/components/Modal";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSession } from "@/providers/session_provider";

const FolderScreen = ({ folderId }: { folderId: string }) => {
  const { userId } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const { folder, isLoading } = useGetFolder(folderId);

  const mutation = useDeleteFolder({
    folderId,
    closeModal: () => setModalVisible(false),
  });

  function onFloatingButtonPressed(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    // bottomSheetRef.current?.present();
    setIsOpen(true);
  }

  function onDeleteIconPressed(): void {
    setModalVisible(true);
  }

  function deleteFolder() {
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
              <HeaderTitle name={folder?.name ?? "Folder"} type="Carpeta" />
            ),
            headerRight: () => (
              <TouchableHighlight
                onPress={onDeleteIconPressed}
                style={styles.deleteButton}
                underlayColor="#CBD5E1"
              >
                <Feather name="trash" size={20} color={Colors.secondary} />
              </TouchableHighlight>
            ),
          }}
        />
        <SectionHeader name="Libretas" />
        <DocumentItemsSkeleton show={isLoading} />
        <View style={styles.listItemsContainer}>
          {folder?.notebooks?.map((notebook) => (
            <DocumentItem
              key={notebook._id}
              title={notebook.name}
              description={`${notebook.notes.length} Notas`}
              iconName="file"
              color={folder.color}
              onSelected={() => router.push(`/notebook/${notebook._id}`)}
            />
          ))}
          {folder?.notebooks?.length === 0 && (
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
                Aun no tienes libretas
              </Text>
            </View>
          )}
        </View>
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      {isOpen ? (
        <CustomBottomSheet onCloseBottomSheet={() => setIsOpen(false)} />
      ) : null}
      <Modal
        visible={modalVisible}
        onDismiss={() => !mutation.isPending && setModalVisible(false)}
      >
        {mutation.isPending ? (
          <View
            style={{
              padding: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: Colors.primary, paddingBottom: 20 }}>
              Eliminando carpeta...
            </Text>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : (
          <AlertDialog
            onConfirm={deleteFolder}
            onDismiss={() => setModalVisible(false)}
            title="¿Deseas eliminar esta carpeta?"
            description="Esta acción no se puede deshacer"
            confirmButtonLabel="Si, Eliminar"
            dismissButtonLabel="No, Cancelar"
          />
        )}
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

  const { userId } = useSession();

  const { id: folderId } = useLocalSearchParams();

  const form = useCreateNotebookForm();

  const mutation = useCreateNotebook({
    closeModal: () => {
      bottomSheetRef.current?.close();
      onCloseBottomSheet();
    },
  });

  function onSubmit() {
    if (!form.isValid) return;

    hideKeyboard();

    mutation.mutate({
      name: form.getValues("name"),
      isFeatured: false,
      userId: userId!,
      folderId: folderId as string,
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
          <Feather name="file-plus" size={24} color={Colors.primary} />
          <Text style={styles.sheetHeaderTitle}>Nueva Libreta</Text>
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
          style={{ backgroundColor: Colors.primary }}
          labelColor="white"
        />
      </View>
    </BottomSheet>
  );
};
