import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";

type SignUpResponse = {
  message: string;
  data: {
    token: string;
    userId: string;
  };
};

export default function useSignUpMutation() {
  const { signIn } = useSession();
  const router = useRouter();

  const mutation = useMutation<
    SignUpResponse,
    Error,
    { password: string; email: string; username: string },
    unknown
  >({
    mutationFn: async (body) => {
      console.log("body", body);
      const response = await axiosInstance.post("/auth/register", body);

      return response.data;
    },
    onSuccess: (data) => {
      console.log("on success data", data);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      signIn(data.data.token, data.data.userId);

      Toast.show({
        type: "success",
        text1: data.message,
        text2: "Bienvenido 👋",
      });

      router.replace("/");
    },
  });

  return mutation;
}
