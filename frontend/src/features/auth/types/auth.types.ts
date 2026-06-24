import { z } from "zod";

export const passwordSchema = z
  .string("Password is required!")
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerUserSchema = z
  .object({
    firstName: z.string().min(1, "First name is required!"),
    lastName: z.string().min(1, "Last name is required!"),
    email: z.email(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required!"),
});

export const authResponseSchema = z.object({
  token: z.string(),
  userId: z.number(),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
