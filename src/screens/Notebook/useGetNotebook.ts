import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/config/axios";
import { useSession } from "@/providers/session_provider";
import { GetNotebookDto } from "@/types/get_notebook_dto";

export default function useGetNotebook({ notebookId }: { notebookId: string }) {
  const { token, userId } = useSession();

  const query = useQuery<GetNotebookDto>({
    queryKey: ["notebook", notebookId],
    queryFn: async () => {
      const url = `/notebooks/notebook/${notebookId}?userId=${userId}`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  return {
    notebook: query.data?.data,
    ...query,
  };
}
