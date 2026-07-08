import express from "express";
import authRouter from "./routes/auth";
import errorHandler from "./middleware/error.middleware";
import cors from "cors";
import postsRouter from "./routes/posts";

const app = express();

// APP MIDDLEWAERS
app.use(express.json());
app.use(cors());

// PUBLIC ROUTE HANDLERS
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;
