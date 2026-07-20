import { useMutation, useQueryClient } from "@tanstack/react-query";
import likesService from "../api/likes";
import type { PostsType } from "../types/posts.types";
import { matchesPostLists } from "./postListCache";

type ToggleLikeVars = { postId: number; isLiked: boolean };

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, isLiked }: ToggleLikeVars) =>
      isLiked
        ? likesService.deleteLike(postId)
        : likesService.createLike(postId),

    onMutate: async ({ postId, isLiked }) => {
      // cancel in-flight refetches so they don't overwrite our optimistic write
      await queryClient.cancelQueries({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      // snapshot every list cache so we can roll back
      const previous = queryClient.getQueriesData<PostsType>({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      // flip isLiked and the like count right away
      queryClient.setQueriesData<PostsType>(
        { predicate: (query) => matchesPostLists(query.queryKey) },
        (old) =>
          old?.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !isLiked,
                  _count: {
                    ...post._count,
                    likes: post._count.likes + (isLiked ? -1 : 1),
                  },
                }
              : post,
          ),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      // put everything back if the request fails
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      // sync with the server (exact count, ordering...)
      queryClient.invalidateQueries({
        predicate: (query) => matchesPostLists(query.queryKey),
      });
      // refresh profile stats (own or someone else's, if open)
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // refresh the detail page if it's open
      queryClient.invalidateQueries({ queryKey: ["posts", "detail"] });
    },
  });
};
