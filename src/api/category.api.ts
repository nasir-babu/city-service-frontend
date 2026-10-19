
import apiClient from "@/lib/apiClient";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
  ICategoryQueryParams,
} from "@/types/category.type";

export const categories = async () => {
  return await apiClient("/categories");
};

// Get All Categories (With Query Params)
export const getAllCategoriesApi = async (params?: ICategoryQueryParams) => {
  const query = new URLSearchParams();
  if (params?.type) query.append("type", params.type);
  if (params?.name) query.append("name", params.name);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  return await apiClient(`/categories${queryString}`, {
    method: "GET",
  });
};

// Get Category By ID
export const getCategoryByIdApi = async (id: string) => {
  return await apiClient(`/categories/${id}`, {
    method: "GET",
  });
};

// Create Category (Admin)
export const createCategoryApi = async (payload: ICreateCategoryPayload) => {
  return await apiClient("/categories", {
    method: "POST",
    body: payload,
  });
};

// Update Category By ID (Admin)
export const updateCategoryApi = async ({
  id,
  payload,
}: {
  id: string;
  payload: IUpdateCategoryPayload;
}) => {
  return await apiClient(`/categories/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

// Delete Category By ID (Admin)
export const deleteCategoryApi = async (id: string) => {
  return await apiClient(`/categories/${id}`, {
    method: "DELETE",
  });
};