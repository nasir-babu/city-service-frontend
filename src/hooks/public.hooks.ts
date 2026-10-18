import { getPublicStats } from "@/api/public.api";
import { useQuery } from "@tanstack/react-query";


export const useGetPublicStats = () => {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: async () => {
      const response = await getPublicStats();
      return response;
    },
  });
};