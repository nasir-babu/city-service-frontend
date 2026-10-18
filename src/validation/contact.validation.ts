import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters long.").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type IContactFormValues = z.infer<typeof contactSchema>;