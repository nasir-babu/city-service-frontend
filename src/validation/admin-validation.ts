// src/validation/admin.validation.ts
import { z } from "zod";

export const createStaffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^01[3-9]\d{8}$/,
      "Please enter a valid 11-digit Bangladeshi phone number",
    )
    .optional()
    .or(z.literal("")),
  department: z.string().min(1, "Department is required"),
  designation: z.string().optional(),
  qualification: z.string().optional(),
});

export type ICreateStaffFormValues = z.infer<typeof createStaffSchema>;
