import apiClient from "@/lib/apiClient";
import { ICreateStaffPayload } from "@/types/admin.type";

export const getAdminDashboardStats = async () => {
  return await apiClient("/admin/dashboard-stats", {
    method: "GET",
  });
};

// Create Staff API (POST /admin/create-staff)
export const createStaffApi = async (payload: ICreateStaffPayload) => {
  return await apiClient("/admin/create-staff", {
    method: "POST",
    body: payload,
  });
};

