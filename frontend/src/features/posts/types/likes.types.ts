import { z } from "zod/v4-mini";

export const likeSchema = z.object({
  userId: z.number(),
  postId: z.number(),
  createdAt: z.coerce.date(),
});

export type LikeType = z.infer<typeof likeSchema>;
