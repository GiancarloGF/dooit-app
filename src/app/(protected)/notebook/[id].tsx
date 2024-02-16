import { useLocalSearchParams } from "expo-router";

import NoteBookScreen from "@/screens/Notebook";

export default function Notebook() {
  const { id: notebookId } = useLocalSearchParams();
  return <NoteBookScreen notebookId={notebookId as string} />;
}
