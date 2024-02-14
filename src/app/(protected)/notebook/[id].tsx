import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import * as yup from "yup";

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
import { useSession } from "@/providers/session_provider";
import { CreateNoteReqDto, CreateNoteResDto } from "@/types/create_note_dto";
import {
  DeleteNotebookReqDto,
  DeleteNotebookResDto,
} from "@/types/delete_notebook_dto";
import { GetNotebookDto } from "@/types/get_notebook_dto";

const NoteBookScreen = () => {
  const { id: notebookId } = useLocalSearchParams();
  const { token, userId } = useSession();
  // const [notes, setNotes] = React.useState(DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: notebookResponse } = useQuery<GetNotebookDto>({
    queryKey: ["notebook", notebookId],
    queryFn: async () => {
      const url = `http://192.168.18.20:3000/notebooks/notebook/${notebookId}?userId=${userId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  const mutation = useMutation<
    DeleteNotebookResDto,
    Error,
    DeleteNotebookReqDto,
    unknown
  >({
    mutationFn: async () => {
      // const { userId } = body;
      // console.log("Id de usuario", userId);

      const url = `http://192.168.18.20:3000/notebooks/${notebookId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onError: (error) => {
      console.log("on error", error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setModalVisible(false);
    },
    onSuccess: (data) => {
      console.log("on success data", data);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });

      Toast.show({
        type: "success",
        text1: data.message,
        text2: data.data.name,
      });

      setModalVisible(false);
      router.back();
    },
  });

  const notebook = notebookResponse?.data;

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
      {isOpen ? (
        <CustomBottomSheet onCloseBottomSheet={() => setIsOpen(false)} />
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

type FormData = {
  name: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "Longitud mínima 3 caracteres"),
  })
  .required();

const BottomSheetContent = ({
  closeBottomSheet,
  hideKeyboard,
}: {
  closeBottomSheet: () => void;
  hideKeyboard: () => void;
}) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id: notebookId } = useLocalSearchParams();
  const { userId, token } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    CreateNoteResDto,
    Error,
    CreateNoteReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      console.log("on mutationFn body", body);
      const response = await axios.post(
        "http://192.168.18.20:3000/notes",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    },
    onSuccess: (data) => {
      // // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      // signIn(data.data.token, data.data.userId);
      Toast.show({
        type: "success",
        text1: data.message,
        text2: data.data.description,
      });

      closeBottomSheet();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  // const { hideKeyboard } = useKeyboard();

  function onSubmit() {
    if (!isValid) return;

    hideKeyboard();

    mutation.mutate({
      description: getValues("name"),
      isCompleted: false,
      userId: userId!,
      notebookId: notebookId as string,
    });
  }

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.sheetHeader}>
        <Feather name="plus-square" size={24} color={Colors.primary} />
        <Text style={styles.sheetHeaderTitle}>Nueva Nota</Text>
      </View>
      <View style={styles.sheetContent}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nombre"
              labelColor={Colors.primary}
              selectionColor={Colors.primary}
              style={{ color: Colors.primary }}
              errorText={errors.name?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {/* <TextInput
          label="Nombre"
          errorText={undefined}
          labelColor={Colors.primary}
        /> */}
      </View>
      {/* <View style={{ flex: 1 }} /> */}
      <Button
        label="Crear"
        isLoading={mutation.isPending}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
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
