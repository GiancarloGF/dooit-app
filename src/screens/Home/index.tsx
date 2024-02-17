import Feather from "@expo/vector-icons/Feather";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Link, Stack, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, StatusBar, View } from "react-native";

import styles from "./styles";
import useCreateFolderForm from "./useCreateFolderForm";
import useCreateFolderMutation from "./useCreateFolderMutation";
import useUserQuery from "./useUserQuery";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import DocumentItem from "@/components/DocumentItem";
import DocumentItemsSkeleton from "@/components/DocumentItemSkeleton";
import FloatingActionButton from "@/components/FloatingActionButton";
import SectionHeader from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import TextInput from "@/components/TextInput";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSession } from "@/providers/session_provider";

const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, isLoading } = useUserQuery();

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
              <>
                {user ? (
                  <Link href="/menu" asChild>
                    <Pressable>
                      <Avatar
                        initialsFrom={user.username}
                        containerStyle={{ backgroundColor: "white" }}
                        textStyle={{ color: Colors.primary }}
                      />
                    </Pressable>
                  </Link>
                ) : (
                  <Skeleton
                    colorMode="light"
                    height={40}
                    width={40}
                    radius={100}
                  />
                )}
              </>
            ),
          }}
        />
        <Text style={styles.welcomeText}>
          👋 Hola{user ? `, ${user.username}` : ""}!
        </Text>
        <SectionHeader name="Carpetas" />
        <DocumentItemsSkeleton show={isLoading} />
        <View style={styles.listItemsContainer}>
          {user?.folders?.map((folder) => (
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
        {user?.folders?.length === 0 && (
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

const colors = [
  "#FFEFD7",
  "#E4FDFF",
  "#D9FFDA",
  "#EED8FF",
  "#FFD8D8",
  "#D9D9D9",
];

const CustomBottomSheet = ({
  onCloseBottomSheet,
}: {
  onCloseBottomSheet: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { keyboardShown, hideKeyboard } = useKeyboard();
  const [colorSelected, setColorSelected] = useState<string>(colors[0]);
  const { userId } = useSession();

  const form = useCreateFolderForm();

  const mutation = useCreateFolderMutation({
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
      label: "",
      color: colorSelected,
    });
  }

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
      <View style={styles.sheetContainer}>
        <View style={styles.sheetHeader}>
          <Feather name="folder-plus" size={24} color={Colors.primary} />
          <Text style={styles.sheetHeaderTitle}>Nueva Carpeta</Text>
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
          disabled={!form.isValid}
          onPress={form.handleSubmit(onSubmit)}
          style={{
            backgroundColor: !form.isValid ? "gray" : Colors.primary,
          }}
          labelColor="white"
        />
      </View>
      {/* <BottomSheetContent
        closeBottomSheet={() => {
          bottomSheetRef.current?.collapse();
          onCloseBottomSheet();
        }}
        hideKeyboard={hideKeyboard}
      /> */}
    </BottomSheet>
  );
};
