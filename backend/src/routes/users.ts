import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authenticateJWT, optionalJWT } from "../middleware/auth.middleware";
import { updateUserSchema, UpdateUserDTO } from "../types/users";

const usersRouter = Router();

// Vraca post u istom obliku kao GET /posts
const postInclude = (userId: number) => ({
  _count: {
    select: { likes: true, comments: true },
  },
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  },
  likes: {
    where: { userId },
    select: { postId: true },
  },
  saves: {
    where: { userId },
    select: { postId: true },
  },
});

// Profil ulogovanog korisnika sa statistikom
usersRouter.get("/me", authenticateJWT, async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      profileImage: true,
      _count: {
        select: { posts: true, savedPosts: true },
      },
    },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const likesReceived = await prisma.like.count({
    where: { post: { authorId: userId } },
  });

  const { _count, ...rest } = user;

  res.status(200).json({
    ...rest,
    stats: {
      blogsPublished: _count.posts,
      likesReceived,
      postsSaved: _count.savedPosts,
    },
  });
});

// Azuriranje profila ulogovanog korisnika
usersRouter.put(
  "/me",
  authenticateJWT,
  async (req: Request<unknown, unknown, UpdateUserDTO>, res: Response) => {
    const userId = req.user!.userId;
    const parsed = updateUserSchema.parse(req.body);

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        profileImage: parsed.profileImage,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profileImage: true,
      },
    });

    res.status(200).json(updated);
  },
);

// Postovi ulogovanog korisnika
usersRouter.get(
  "/me/posts",
  authenticateJWT,
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      include: postInclude(userId),
    });

    const result = posts.map(({ likes, saves, ...post }) => ({
      ...post,
      isOwner: true,
      isLiked: likes.length > 0,
      isSaved: saves.length > 0,
    }));

    res.status(200).json(result);
  },
);

// Sacuvani postovi ulogovanog korisnika
usersRouter.get(
  "/me/saved",
  authenticateJWT,
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;

    const saves = await prisma.save.findMany({
      where: { userId },
      orderBy: { post: { createdAt: "desc" } },
      include: {
        post: {
          include: postInclude(userId),
        },
      },
    });

    const result = saves.map(({ post }) => {
      const { likes, saves: _saves, ...rest } = post;
      return {
        ...rest,
        isOwner: rest.author.id === userId,
        isLiked: likes.length > 0,
        isSaved: true,
      };
    });

    res.status(200).json(result);
  },
);

// "/:userId" rute moraju ici posle svih "/me" ruta, inace bi "/me" upalo ovde.

// Javni profil korisnika
usersRouter.get(
  "/:userId",
  async (req: Request<{ userId: string }>, res: Response) => {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        _count: { select: { posts: true } },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const likesReceived = await prisma.like.count({
      where: { post: { authorId: userId } },
    });

    const { _count, ...rest } = user;

    res.status(200).json({
      ...rest,
      stats: {
        blogsPublished: _count.posts,
        likesReceived,
      },
    });
  },
);

// Postovi korisnika
usersRouter.get(
  "/:userId/posts",
  optionalJWT,
  async (req: Request<{ userId: string }>, res: Response) => {
    const userId = Number(req.params.userId);
    const viewerId = req.user?.userId ?? -1;

    if (Number.isNaN(userId)) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      include: postInclude(viewerId),
    });

    const result = posts.map(({ likes, saves, ...post }) => ({
      ...post,
      isOwner: post.author.id === viewerId,
      isLiked: likes.length > 0,
      isSaved: saves.length > 0,
    }));

    res.status(200).json(result);
  },
);

export default usersRouter;
