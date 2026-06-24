import { Router, Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt-ts";
import { prisma } from "../lib/prisma";
import {
  registerUserSchema,
  loginUserSchema,
  RegisterUserDTO,
  LoginUserDTO,
  UserTokenPayload,
} from "../types/auth";
import { generateToken } from "../services/auth.service";

const authRouter = Router();

authRouter.post(
  "/register",
  async (req: Request<unknown, unknown, RegisterUserDTO>, res: Response) => {
    const parsedData = registerUserSchema.parse(req.body);

    const { firstName, lastName, email, password } = parsedData;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      },
    });

    const tokenPayload: UserTokenPayload = {
      userId: user.id,
      email: user.email,
    };
    res
      .status(201)
      .json({ token: generateToken(tokenPayload), userId: user.id });
  },
);

authRouter.post(
  "/login",
  async (req: Request<unknown, unknown, LoginUserDTO>, res: Response) => {
    const credentials = loginUserSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (!user) {
      res.status(401).json({ error: "The email or password is incorrect." });
      return;
    }

    const isRightPassword = await compare(
      credentials.password,
      user.passwordHash,
    );
    if (!isRightPassword) {
      res.status(401).json({ error: "The email or password is incorrect." });
      return;
    }

    const tokenPayload: UserTokenPayload = {
      userId: user.id,
      email: user.email,
    };
    res
      .status(200)
      .json({ token: generateToken(tokenPayload), userId: user.id });
  },
);

export default authRouter;
