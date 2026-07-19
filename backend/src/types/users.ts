import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profileImage: z.string(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
