import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import {
  DeleteFolderReqDto,
  DeleteFolderResDto,
} from "@/types/delete_folder_dto";

export default function useDeleteFolder({
  folderId,
  closeModal,
}: {
  folderId: string;
  closeModal: () => void;
}) {
  const { token } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    DeleteFolderResDto,
    Error,
    DeleteFolderReqDto,
    unknown
  >({
    mutationFn: async () => {
      // const { userId } = body;
      // console.log("Id de usuario", userId);

      const url = `/folders/${folderId}`;
      const response = await axiosInstance.delete(url, {
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
      closeModal();
    },
    onSuccess: (data) => {
      console.log("on success data", data);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });

      Toast.show({
        type: "success",
        text1: data.message,
        text2: data.data.name,
      });

      closeModal();
      router.back();
    },
  });

  return mutation;
}
