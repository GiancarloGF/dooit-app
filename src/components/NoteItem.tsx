import Feather from "@expo/vector-icons/Feather";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import Checkbox from "./Checkbox";
import { Text } from "./Text";

import axios from "@/config/axios";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/providers/session_provider";
import { DeleteNoteReqDto, DeleteNoteResDto } from "@/types/delete_note_dto";
import { Note } from "@/types/note";
import { UpdateNoteReqDto, UpdateNoteResDto } from "@/types/update_nota_dto";

type Props = {
  note: Note;
};
const NoteItem: React.FC<Props> = ({ note }) => {
  const { _id, description, isCompleted } = note;
  const { token } = useSession();
  const queryClient = useQueryClient();
  const textColor = useThemeColor(undefined, "text");

  const updateNote = useMutation<
    UpdateNoteResDto,
    Error,
    UpdateNoteReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      const response = await axios.patch(`/notes/${_id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error al actualizar la nota",
        text2: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const deleteNote = useMutation<
    DeleteNoteResDto,
    Error,
    DeleteNoteReqDto,
    unknown
  >({
    mutationFn: async () => {
      const response = await axios.delete(`/notes/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error al eliminar la nota",
        text2: error.message,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      Toast.show({
        type: "success",
        text1: "Nota eliminada",
        text2: data.data.description,
      });
    },
  });

  function onCompleteNote() {
    if (updateNote.isPending) return;

    updateNote.mutate({
      isCompleted: !isCompleted,
    });
  }

  function onDeleteNote() {
    if (deleteNote.isPending) return;

    deleteNote.mutate({});
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onCompleteNote}>
        <Checkbox isChecked={isCompleted} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: isCompleted ? "line-through" : "none",
            },
          ]}
        >
          {description}
        </Text>
      </View>
      {/* <View style={{ flex: 1 }} /> */}
      <Pressable onPress={onDeleteNote}>
        <Feather name="x" size={20} color={textColor} />
      </Pressable>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    textDecorationLine: "line-through",
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
});
