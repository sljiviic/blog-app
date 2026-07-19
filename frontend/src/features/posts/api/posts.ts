import { api } from "@/services/api";
import {
  basePostSchema,
  detailedPostSchema,
  postsSchema,
  searchedPostsSchema,
  type BasePostType,
  type DetailedPostType,
  type PostsSortBy,
  type PostsType,
  type SearchedPostsType,
  type UpsertPostDTO,
} from "../types/posts.types";

const fetchPosts = async (sortBy: PostsSortBy): Promise<PostsType> => {
  const { data } = await api.get(`/posts/?sortBy=${sortBy}`);
  return postsSchema.parse(data);
};

const fetchSearchedPosts = async (
  title: string,
): Promise<SearchedPostsType> => {
  const { data } = await api.get(`/posts/search/?title=${title}`);
  return searchedPostsSchema.parse(data);
};

const fetchPostBySlug = async (slug: string): Promise<DetailedPostType> => {
  const { data } = await api.get(`/posts/${slug}`);
  return detailedPostSchema.parse(data);
};

const createPost = async (postData: UpsertPostDTO): Promise<BasePostType> => {
  const { data } = await api.post("/posts", postData);
  return basePostSchema.parse(data);
};

const updatePost = async ({
  postId,
  postData,
}: {
  postId: number;
  postData: UpsertPostDTO;
}): Promise<BasePostType> => {
  const { data } = await api.put(`/posts/${postId}`, postData);
  return basePostSchema.parse(data);
};

const deletePost = async (postId: number): Promise<null> => {
  await api.delete(`/posts/${postId}`);
  return null;
};

export default {
  fetchPosts,
  fetchSearchedPosts,
  fetchPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
