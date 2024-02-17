import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import {
  CreateFolderReqDto,
  CreateFolderResDto,
} from "@/types/create_folder_dto";

export default function useCreateFolderMutation({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const { token } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    CreateFolderResDto,
    Error,
    CreateFolderReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      console.log("on mutationFn body", body);
      const response = await axiosInstance.post("/folders", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

      closeModal?.();

      router.push(`/folder/${data.data._id}`);
    },
  });

  return mutation;
}
