import { Stack } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import HeaderTitle from "@/components/HeaderTitle";
import NoteItem from "@/components/NoteItem";
import SectionHeader from "@/components/SectionHeader";
import { ViewThemed } from "@/components/ViewThemed";

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

  return (
    <ViewThemed style={styles.mainView}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderTitle name="Gastos Diarios" type="Libreta" />
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
    </ViewThemed>
  );
};

export default NoteBookScreen;

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
});
