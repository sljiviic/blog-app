import { z } from "zod/v4-mini";

export const saveSchema = z.object({
  userId: z.number(),
  postId: z.number(),
});

export type SaveType = z.infer<typeof saveSchema>;
