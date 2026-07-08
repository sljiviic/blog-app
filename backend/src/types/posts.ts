import { z } from "zod";

export const upsertPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(3, "Content must be at least 3 characters long"),
  published: z.boolean(),
});

export const commentPostSchema = z.object({
  comment: z.string(),
});

export type UpsertPostDTO = z.infer<typeof upsertPostSchema>;
export type CommentPostDTO = z.infer<typeof commentPostSchema>;
