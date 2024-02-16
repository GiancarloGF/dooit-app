import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import {
  DeleteNotebookReqDto,
  DeleteNotebookResDto,
} from "@/types/delete_notebook_dto";

export default function useDeleteNotebook({
  notebookId,
  closeModal,
}: {
  notebookId: string;
  closeModal: () => void;
}) {
  const { token } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    DeleteNotebookResDto,
    Error,
    DeleteNotebookReqDto,
    unknown
  >({
    mutationFn: async () => {
      // const { userId } = body;
      // console.log("Id de usuario", userId);

      const url = `/notebooks/${notebookId}`;
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
      queryClient.invalidateQueries({ queryKey: ["folder"] });

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
