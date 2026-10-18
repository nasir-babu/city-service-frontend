import apiClient from "@/lib/apiClient";
import { IPublicStats } from "@/types/public.type";


export const getPublicStats = async () => {
  return await apiClient<{ success: boolean; data: IPublicStats }>(
    "/public/stats",
    { method: "GET" }
  );
};