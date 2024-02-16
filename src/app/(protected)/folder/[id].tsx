import { useLocalSearchParams } from "expo-router";

import FolderScreen from "@/screens/Folder";

export default function Folder() {
  const { id: folderId } = useLocalSearchParams();
  return <FolderScreen folderId={folderId as string} />;
}
