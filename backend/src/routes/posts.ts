import { Router, Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "../../generated/prisma/client";
import { authenticateJWT, optionalJWT } from "../middleware/auth.middleware";
import {
  CommentPostDTO,
  commentPostSchema,
  UpsertPostDTO,
  upsertPostSchema,
} from "../types/posts";
import { generateUniqueSlug } from "../services/slug.service";

const postsRouter = Router();

// All posts with like/comment counts, sorted
postsRouter.get("/", optionalJWT, async (req: Request, res: Response) => {
  const sortBy = req.query.sortBy || "newest";
  const user = req.user;

  const orderBy: Prisma.PostOrderByWithRelationInput =
    sortBy === "popular"
      ? { likes: { _count: "desc" } }
      : { createdAt: "desc" };

  const posts = await prisma.post.findMany({
    orderBy,
    include: {
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
        where: { userId: user?.userId ?? -1 },
        select: { postId: true },
      },
      saves: {
        where: { userId: user?.userId ?? -1 },
        select: { postId: true },
      },
    },
  });

  const result = posts.map(({ likes, saves, ...post }) => ({
    ...post,
    isOwner: user?.userId === post.author.id,
    isLiked: likes.length > 0,
    isSaved: saves.length > 0,
  }));

  res.status(200).json(result);
});

// Search results
postsRouter.get("/search", async (req: Request, res: Response) => {
  const title = req.query.title;

  if (typeof title !== "string") {
    res.status(400).json({ error: "Title query param is required." });
    return;
  }

  if (title.trim() === "") {
    res.status(200).json([]);
    return;
  }

  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });

  res.status(200).json(posts);
});

// Single post by slug
postsRouter.get(
  "/:slug",
  optionalJWT,
  async (req: Request<{ slug: string }>, res: Response) => {
    const slug = req.params.slug;
    const user = req.user;

    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        _count: {
          select: { likes: true },
        },
        comments: {
          include: {
            user: {
              select: { firstName: true, lastName: true, profileImage: true },
            },
          },
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
          where: { userId: user?.userId ?? -1 },
          select: { postId: true },
        },
        saves: {
          where: { userId: user?.userId ?? -1 },
          select: { postId: true },
        },
      },
    });

    if (post) {
      const result = {
        ...post,
        isOwner: user?.userId === post.author.id,
        isLiked: post.likes.length > 0,
        isSaved: post.saves.length > 0,
      };

      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  },
);

// Create a post
postsRouter.post(
  "/",
  authenticateJWT,
  async (req: Request<unknown, unknown, UpsertPostDTO>, res: Response) => {
    const parsedData = upsertPostSchema.parse(req.body);
    const user = req.user!;

    const { title, content } = parsedData;
    const slug = await generateUniqueSlug(title);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage: parsedData.coverImage ?? "",
        authorId: user.userId,
      },
    });

    res.status(201).json(newPost);
  },
);

// Update a post
postsRouter.put(
  "/:postId",
  authenticateJWT,
  async (
    req: Request<{ postId: string }, unknown, UpsertPostDTO>,
    res: Response,
  ) => {
    const parsedData = upsertPostSchema.parse(req.body);
    const user = req.user!;
    const postId = Number(req.params.postId);

    const { title, content } = parsedData;

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: user.userId,
      },
      data: {
        title,
        content,
        ...(parsedData.coverImage !== undefined && {
          coverImage: parsedData.coverImage,
        }),
      },
    });

    res.status(200).json(updatedPost);
  },
);

// Delete a post
postsRouter.delete(
  "/:postId",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    await prisma.post.delete({
      where: {
        id: postId,
        authorId: user.userId,
      },
    });

    res.status(204).end();
  },
);

// Like a post
postsRouter.post(
  "/:postId/like",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    const newLike = await prisma.like.upsert({
      where: { userId_postId: { userId: user.userId, postId: postId } },
      create: { postId: postId, userId: user.userId },
      update: {},
    });

    res.status(201).json(newLike);
  },
);

// Unlike a post
postsRouter.delete(
  "/:postId/like",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    await prisma.like.deleteMany({
      where: {
        postId: postId,
        userId: user.userId,
      },
    });

    res.status(204).end();
  },
);

// Save a post
postsRouter.post(
  "/:postId/save",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    const newSave = await prisma.save.upsert({
      where: { userId_postId: { userId: user.userId, postId: postId } },
      create: { postId: postId, userId: user.userId },
      update: {},
    });

    res.status(201).json(newSave);
  },
);

// Unsave a post
postsRouter.delete(
  "/:postId/save",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    await prisma.save.deleteMany({
      where: {
        postId: postId,
        userId: user.userId,
      },
    });

    res.status(204).end();
  },
);

// Add a comment
postsRouter.post(
  "/:postId/comment",
  authenticateJWT,
  async (
    req: Request<{ postId: string }, unknown, CommentPostDTO>,
    res: Response,
  ) => {
    const parsedData = commentPostSchema.parse(req.body);
    const user = req.user!;
    const postId = Number(req.params.postId);

    const { comment } = parsedData;

    const newComment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: user.userId,
        comment: comment,
      },
    });

    res.status(201).json(newComment);
  },
);

// Delete a comment
postsRouter.delete(
  "/:postId/comment",
  authenticateJWT,
  async (req: Request<{ commentId: string }>, res: Response) => {
    const user = req.user!;
    const commentId = Number(req.params.commentId);

    await prisma.comment.delete({
      where: {
        id: commentId,
        userId: user.userId,
      },
    });

    res.status(204).end();
  },
);

export default postsRouter;
