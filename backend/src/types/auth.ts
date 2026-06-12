import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";

export const passwordSchema = z
  .string("Password is required!")
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;

export interface UserTokenPayload extends JwtPayload {
  userId: number;
  email: string;
}
