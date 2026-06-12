import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof jwt.JsonWebTokenError) {
    res.status(403).json({ error: err.message || "Malformed token." });
    return;
  } else if (err instanceof ZodError) {
    res.status(400).json({ error: err.issues || "Zod validation error." });
    return;
  } else if (err instanceof PrismaClientKnownRequestError) {
    let message = "A database error has occurred.";

    if (err.code === "P2002") {
      message = "A record with the same values already exists.";
    } else if (err.code === "P2025") {
      message = "The requested record was not found.";
    }

    console.error("Prisma Error:", err.meta);

    res.status(400).json({ error: message });
    return;
  }
  next(err);
};

export default errorHandler;
