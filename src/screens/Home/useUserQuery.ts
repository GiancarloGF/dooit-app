import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import { GetUserResDto } from "@/types/get_user_dto";

export default function useUserQuery() {
  const { userId, token } = useSession();

  const query = useQuery<GetUserResDto>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const url = `/users/${userId}`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  return {
    user: query.data?.data,
    ...query,
  };
}
