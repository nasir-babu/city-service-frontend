
export interface Category {
  id: string;
  name: string;
  description?: string;
  type: "FREE" | "PAID" | string | number;
  unitName?: string;
  basePrice?: number;
}

export interface CreateServiceRequestFormProps {
  categories?: Category[];
  isLoadingCategories?: boolean;
  initialData?: any;
  isUpdateMode?: boolean;
  onSuccess?: () => void;
}


export interface ICategory {
  id: string;
  name: string;
  description?: string;
  type?: number | string;
  unitName?: string;
  basePrice?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateCategoryPayload {
  name: string;
  description?: string;
  type?: number | string;
  unitName?: string;
  basePrice?: number;
}

export interface IUpdateCategoryPayload {
  name?: string;
  description?: string;
  type?: number | string;
  unitName?: string;
  basePrice?: number;
}

export interface ICategoryQueryParams {
  type?: string;
  name?: string;
}