import { useMutation, useQueryClient } from "@tanstack/react-query";
import savesService from "../api/saves";
import type { PostsType } from "../types/posts.types";
import { matchesPostLists } from "./postListCache";

type ToggleSaveVars = { postId: number; isSaved: boolean };

export const useToggleSaveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, isSaved }: ToggleSaveVars) =>
      isSaved
        ? savesService.deleteSave(postId)
        : savesService.createSave(postId),

    onMutate: async ({ postId, isSaved }) => {
      await queryClient.cancelQueries({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      const previous = queryClient.getQueriesData<PostsType>({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      queryClient.setQueriesData<PostsType>(
        { predicate: (query) => matchesPostLists(query.queryKey) },
        (old) =>
          old?.map((post) =>
            post.id === postId ? { ...post, isSaved: !isSaved } : post,
          ),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
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
