import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import { UserTokenPayload } from "../types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
    }
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedPayload = verifyToken(token);
    req.user = decodedPayload;
    next();
  } catch (error) {
    next(error);
  }
};

export const optionalJWT = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ") && !req.user) {
    const token = authHeader.split(" ")[1];

    try {
      req.user = verifyToken(token);
    } catch {
      // Optional auth: an invalid/expired token just means "not logged in" —
      // don't fail the request, carry on as anonymous.
    }
  }

  next();
};
