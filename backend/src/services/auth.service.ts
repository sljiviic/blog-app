import jwt from "jsonwebtoken";
import { UserTokenPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET isn't defined!");
}

export const generateToken = (
  payload: Omit<UserTokenPayload, "iat" | "exp">,
): string => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string): UserTokenPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  return decoded as UserTokenPayload;
};
