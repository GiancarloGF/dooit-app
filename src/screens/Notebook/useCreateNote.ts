import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import { CreateNoteReqDto, CreateNoteResDto } from "@/types/create_note_dto";

export default function useCreateNote({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { token } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateNoteResDto,
    Error,
    CreateNoteReqDto,
    unknown
  >({
    mutationFn: async (body) => {
      console.log("on mutationFn body", body);
      const response = await axiosInstance.post("/notes", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      // // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      // signIn(data.data.token, data.data.userId);
      Toast.show({
        type: "success",
        text1: data.message,
        text2: data.data.description,
      });

      closeModal();
    },
  });

  return mutation;
}
