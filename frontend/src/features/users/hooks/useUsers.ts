import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usersService from "../api/users";

export const useMyProfileQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: usersService.fetchMyProfile,
    enabled,
  });
};

export const useMyPostsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["users", "me", "posts"],
    queryFn: usersService.fetchMyPosts,
    enabled,
  });
};

export const useSavedPostsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["users", "me", "saved"],
    queryFn: usersService.fetchSavedPosts,
    enabled,
  });
};

export const useUserProfileQuery = (userId: number) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => usersService.fetchUserProfile(userId),
    enabled: Number.isFinite(userId),
  });
};

export const useUserPostsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["users", userId, "posts"],
    queryFn: () => usersService.fetchUserPosts(userId),
    enabled: Number.isFinite(userId),
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });
};
