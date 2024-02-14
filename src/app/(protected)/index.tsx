import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, Stack, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import DocumentItem from "@/components/DocumentItem";
import FloatingActionButton from "@/components/FloatingActionButton";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSession } from "@/providers/session_provider";
import {
  CreateFolderReqDto,
  CreateFolderResDto,
} from "@/types/create_folder_dto";
import { GetUserResDto } from "@/types/get_user_dto";

const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId, token } = useSession();
  const router = useRouter();

  const { data: userDataResponse } = useQuery<GetUserResDto>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const url = `http://192.168.18.20:3000/users/${userId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  const userData = userDataResponse?.data;

  function onFloatingButtonPressed(): void {
    // TODO: Implementar creación de carpetas
    console.log("Crear carpeta");
    // bottomSheetRef.current?.present();
    setIsOpen(true);
  }

  return (
    <>
      <ViewThemed style={styles.mainView}>
        <StatusBar barStyle="light-content" />
        <Stack.Screen
          options={{
            title: "Dooit App",
            headerRight: () => (
              <Link href="/menu" asChild>
                <Pressable>
                  <Avatar
                    containerStyle={{ backgroundColor: "white" }}
                    textStyle={{ color: Colors.primary }}
                  />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Text style={styles.welcomeText}>
          👋 Hola{userData ? `, ${userData.username}` : ""}!
        </Text>
        <SectionHeader name="Carpetas" />
        <View style={styles.listItemsContainer}>
          {userData?.folders?.map((folder) => (
            <DocumentItem
              key={folder._id}
              title={folder.name}
              description={`${folder.notebooks.length} Libretas`}
              iconName="folder"
              color={folder.color}
              onSelected={() => router.push(`/folder/${folder._id}`)}
            />
          ))}
        </View>
        {userData?.folders?.length === 0 && (
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
              Aun no tienes carpetas
            </Text>
          </View>
        )}
        <FloatingActionButton onPress={onFloatingButtonPressed} />
      </ViewThemed>
      {isOpen ? (
        <CustomBottomSheet onCloseBottomSheet={() => setIsOpen(false)} />
      ) : null}
    </>
  );
};

export default HomeScreen;

const CustomBottomSheet = ({
  onCloseBottomSheet,
}: {
  onCloseBottomSheet: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { keyboardShown, hideKeyboard } = useKeyboard();
  const snapPointsValues = useMemo(() => {
    if (keyboardShown) {
      return ["85%"];
    } else {
      return ["50%"];
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

const colors = [
  "#FFEFD7",
  "#E4FDFF",
  "#D9FFDA",
  "#EED8FF",
  "#FFD8D8",
  "#D9D9D9",
];

const BottomSheetContent = ({
  closeBottomSheet,
  hideKeyboard,
}: {
  closeBottomSheet: () => void;
  hideKeyboard: () => void;
}) => {
  // const { hideKeyboard } = useKeyboard();
  const [colorSelected, setColorSelected] = useState<string>(colors[0]);
  const { userId, token } = useSession();
  const queryClient = useQueryClient();

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

  const mutation = useMutation<
    CreateFolderResDto,
    Error,
    CreateFolderReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      console.log("on mutationFn body", body);
      const response = await axios.post(
        "http://192.168.18.20:3000/folders",
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
      // signIn(data.data.token, data.data.userId);
      Toast.show({
        type: "success",
        text1: data.message,
      });

      closeBottomSheet();
    },
  });

  function onSubmit() {
    // setIsLoading(true);

    if (!isValid) return;

    hideKeyboard();

    mutation.mutate({
      name: getValues("name"),
      isFeatured: false,
      userId: userId!,
      label: "",
      color: colorSelected,
    });
  }

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.sheetHeader}>
        <Feather name="folder-plus" size={24} color={Colors.primary} />
        <Text style={styles.sheetHeaderTitle}>Nueva Carpeta</Text>
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
        <View style={styles.colorsSection}>
          <Text style={styles.colorsText}>Color</Text>
          <View style={styles.colorsContainer}>
            {colors.map((color) => (
              <Pressable
                key={color}
                onPress={() => setColorSelected(color)}
                style={[
                  styles.colorItem,
                  {
                    backgroundColor: color,
                    borderWidth: colorSelected === color ? 2 : 0,
                    borderColor: Colors.primary,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      {/* <View style={{ flex: 1 }} /> */}
      <Button
        label="Crear"
        isLoading={mutation.isPending}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: !isValid ? "gray" : Colors.primary }}
        labelColor="white"
      />
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
  //AVATAR
  userAvatar: {
    // width: 30,
    // height: 30,
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#fff",
  },
  userAvatarInitials: {
    color: Colors.primary,
    fontFamily: "ComfortaaBold",
  },

  colorsSection: {
    marginTop: 15,
  },
  colorsText: {
    color: Colors.primary,
    marginBottom: 5,
  },
  colorsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
