import { api } from "@/services/api";
import {
  authResponseSchema,
  type AuthResponse,
  type LoginUserDTO,
  type RegisterUserDTO,
} from "../types/auth.types";

const register = async (
  credentials: RegisterUserDTO,
): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/register", credentials);
  return authResponseSchema.parse(data);
};

const login = async (credentials: LoginUserDTO): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/login", credentials);
  return authResponseSchema.parse(data);
};

export default { register, login };
