import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import {
  CreateNotebookReqDto,
  CreateNotebookResDto,
} from "@/types/create_notebook_dto";

export default function useCreateNotebook({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const { token } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    CreateNotebookResDto,
    Error,
    CreateNotebookReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      console.log("on mutationFn body", body);
      const response = await axiosInstance.post("/notebooks", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      // // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      // signIn(data.data.token, data.data.userId);
      Toast.show({
        type: "success",
        text1: data.message,
        text2: data.data.name,
      });

      closeModal?.();

      router.push(`/notebook/${data.data._id}`);
    },
  });

  return mutation;
}
