import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import postsService from "../api/posts";
import type { PostsSortBy } from "../types/posts.types";

export const usePostsQuery = (sortBy: PostsSortBy) => {
  return useQuery({
    queryKey: ["posts", "list", sortBy],
    queryFn: () => postsService.fetchPosts(sortBy),
  });
};

export const useSearchedPostsQuery = (title: string) => {
  return useQuery({
    queryKey: ["posts", "search", title],
    queryFn: () => postsService.fetchSearchedPosts(title),
    enabled: title.trim().length > 0,
  });
};

export const usePostBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["posts", "detail", slug],
    queryFn: () => postsService.fetchPostBySlug(slug),
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
