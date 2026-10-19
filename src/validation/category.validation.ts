import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  description: z.string().optional(),
  type: z.union([z.number(), z.string()]).optional(),
  unitName: z.string().optional(),
  basePrice: z.coerce
    .number()
    .min(0, "Base price must be a non-negative number.")
    .optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type ICreateCategoryFormValues = z.infer<typeof createCategorySchema>;
export type IUpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
