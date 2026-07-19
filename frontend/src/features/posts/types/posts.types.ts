import { z } from "zod";

export const PLACEHOLDER_COVER =
  "https://res.cloudinary.com/rhgkp87k/image/upload/v1783986454/react_vfz4kc.png";

export const upsertPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(3, "Content must be at least 3 characters long"),
});

export const commentPostSchema = z.object({
  comment: z.string(),
});

export const basePostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  coverImage: z.string().catch(""),
  createdAt: z.coerce.date(),
  authorId: z.number(),
});

export const authorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string(),
});

export const postSchema = basePostSchema.extend({
  _count: z.object({
    likes: z.number(),
    comments: z.number(),
  }),
  author: authorSchema,
  isOwner: z.boolean(),
  isLiked: z.boolean(),
  isSaved: z.boolean(),
});

export const postsSchema = z.array(postSchema);

export const searchedPostsSchema = z.array(basePostSchema);

export const detailedCommentSchema = z.object({
  id: z.number(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    profileImage: z.string(),
  }),
});

export const detailedPostSchema = basePostSchema.extend({
  _count: z.object({
    likes: z.number(),
  }),
  comments: z.array(detailedCommentSchema),
  author: authorSchema,
  isOwner: z.boolean(),
  isLiked: z.boolean(),
  isSaved: z.boolean(),
});

export const postsSortBySchema = z.enum(["newest", "popular"]);

export type UpsertPostFormType = z.infer<typeof upsertPostSchema>;
export type UpsertPostDTO = UpsertPostFormType & { coverImage: string };
export type CommentPostDTO = z.infer<typeof commentPostSchema>;
export type BasePostType = z.infer<typeof basePostSchema>;
export type AuthorType = z.infer<typeof authorSchema>;
export type PostType = z.infer<typeof postSchema>;
export type PostsType = z.infer<typeof postsSchema>;
export type SearchedPostsType = z.infer<typeof searchedPostsSchema>;
export type DetailedPostType = z.infer<typeof detailedPostSchema>;
export type DetailedCommentType = z.infer<typeof detailedCommentSchema>;
export type PostsSortBy = z.infer<typeof postsSortBySchema>;
