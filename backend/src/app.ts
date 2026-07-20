import express from "express";
import authRouter from "./routes/auth";
import errorHandler from "./middleware/error.middleware";
import cors from "cors";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";

const app = express();

// APP MIDDLEWARES
app.use(express.json());
app.use(cors());

// HEALTH CHECK
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// PUBLIC ROUTE HANDLERS
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;
