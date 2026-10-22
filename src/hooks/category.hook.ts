import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  categories,
  getAllCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "@/api/category.api";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
  ICategoryQueryParams,
} from "@/types/category.type";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categories,
    retry: false,
  });
}

//
export const useGetAllCategories = (params?: ICategoryQueryParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getAllCategoriesApi(params),
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateCategoryPayload) => createCategoryApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateCategoryPayload;
    }) => updateCategoryApi({ id, payload }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
