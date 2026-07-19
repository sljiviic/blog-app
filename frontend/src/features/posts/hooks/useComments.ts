import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsService from "../api/comments";

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsService.createComment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts", "list"] }),
        queryClient.invalidateQueries({ queryKey: ["posts", "detail"] }),
      ]);
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsService.deleteComment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts", "list"] }),
        queryClient.invalidateQueries({ queryKey: ["posts", "detail"] }),
      ]);
    },
  });
};
