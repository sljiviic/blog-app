import { Router, Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { authenticateJWT } from "../middleware/auth.middleware";
import {
  CommentPostDTO,
  commentPostSchema,
  UpsertPostDTO,
  upsertPostSchema,
} from "../types/posts";
import { generateUniqueSlug } from "../services/slug.service";

const postsRouter = Router();

// Svi postovi sa izbrojanim lajkovima i komentarima
postsRouter.get("/", async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { likes: true, comments: true },
      },
    },
  });

  res.status(200).json(posts);
});

// Jedan pretrazeni post
postsRouter.get("/search", async (req: Request, res: Response) => {
  const title = req.query.title;

  if (typeof title !== "string") {
    res.status(400).json({ error: "Title query param is required." });
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

// Jedan post preko sluga
postsRouter.get(
  "/:slug",
  async (req: Request<{ slug: string }>, res: Response) => {
    const slug = req.params.slug;

    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        _count: {
          select: { likes: true },
        },
        comments: { select: { comment: true } },
      },
    });

    if (post) {
      res.status(200).json(post);
      return;
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  },
);

// Kreiranje jednog posta
postsRouter.post(
  "/",
  authenticateJWT,
  async (req: Request<unknown, unknown, UpsertPostDTO>, res: Response) => {
    const parsedData = upsertPostSchema.parse(req.body);
    const user = req.user!;

    const { title, content, published } = parsedData;
    const slug = await generateUniqueSlug(title);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        authorId: user.userId,
      },
    });

    res.status(201).json(newPost);
  },
);

// Azuriranje jednog posta
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

    const { title, content, published } = parsedData;

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: user.userId,
      },
      data: {
        title,
        content,
        published,
      },
    });

    res.status(200).json(updatedPost);
  },
);

// Brisanje jednog posta
postsRouter.delete(
  "/:postId",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
        authorId: user.userId,
      },
      select: {
        title: true,
      },
    });

    res.status(204).json(deletedPost);
  },
);

// Kreiranje lajka
postsRouter.post(
  "/:postId/like",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    const newLike = await prisma.like.create({
      data: {
        postId: postId,
        userId: user.userId,
      },
    });

    res.status(201).json(newLike);
  },
);

// Uklanjanje lajka
postsRouter.delete(
  "/:postId/like",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: user.userId,
          postId: postId,
        },
      },
    });

    res.status(204).end();
  },
);

// Kreiranje sejva
postsRouter.post(
  "/:postId/save",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    const newSave = await prisma.save.create({
      data: {
        postId: postId,
        userId: user.userId,
      },
    });

    res.status(201).json(newSave);
  },
);

// Uklanjanje sejva
postsRouter.delete(
  "/:postId/save",
  authenticateJWT,
  async (req: Request<{ postId: string }>, res: Response) => {
    const user = req.user!;
    const postId = Number(req.params.postId);

    await prisma.save.delete({
      where: {
        userId_postId: {
          userId: user.userId,
          postId: postId,
        },
      },
    });

    res.status(204).end();
  },
);

// Kreiranje komentara
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

// Brisanje komentara
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
