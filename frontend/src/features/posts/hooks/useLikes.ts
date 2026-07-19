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
      // zaustavi refetch-ove u letu da ne pregaze nas optimisticki upis
      await queryClient.cancelQueries({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      // snimi trenutno stanje svih list kesova za rollback
      const previous = queryClient.getQueriesData<PostsType>({
        predicate: (query) => matchesPostLists(query.queryKey),
      });

      // odmah preokreni isLiked + broj lajkova za taj post
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
      // vrati sve na staro ako zahtev pukne
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      // sinhronizuj sa serverom (tacan broj, redosled...)
      queryClient.invalidateQueries({
        predicate: (query) => matchesPostLists(query.queryKey),
      });
      // osvezi profilnu statistiku (svoju i tudju, ako je otvorena)
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // osvezi detaljnu stranu ako je otvorena
      queryClient.invalidateQueries({ queryKey: ["posts", "detail"] });
    },
  });
};
