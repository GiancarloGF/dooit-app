import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";

type SignInResponse = {
  message: string;
  data: {
    token: string;
    userId: string;
  };
};

export default function useSignInMutation() {
  const router = useRouter();
  const { signIn } = useSession();

  const mutation = useMutation<
    SignInResponse,
    Error,
    { password: string; email: string },
    unknown
  >({
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/auth/login", body);

      return response.data;
    },
    onError: (error) => {
      console.log("on error", error);

      Toast.show({
        type: "error",
        text1: error.message,
      });
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
