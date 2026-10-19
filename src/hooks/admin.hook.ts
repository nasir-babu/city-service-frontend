import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminDashboardStats, createStaffApi } from "@/api/admin.api";
import { ICreateStaffPayload } from "@/types/admin.type";

export const useGetAdminDashboardStats = () => {
  return useQuery({
    queryKey: ["ADMIN_DASHBOARD_STATS"],
    queryFn: getAdminDashboardStats,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateStaffPayload) => createStaffApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
  });
};