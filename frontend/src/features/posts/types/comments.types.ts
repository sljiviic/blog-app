import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  postId: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date(),
});

export const createCommentSchema = z.object({
  comment: z.string().min(1, "Comment can not be empty"),
});

export type CommentType = z.infer<typeof commentSchema>;
export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
