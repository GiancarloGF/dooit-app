import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import { GetFolderResDto } from "@/types/get_folder_dto";

export default function useGetFolder(folderId: string) {
  const { token, userId } = useSession();

  const query = useQuery<GetFolderResDto>({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      const url = `/folders/folder/${folderId}?userId=${userId}`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  return {
    folder: query.data?.data,
    ...query,
  };
}
