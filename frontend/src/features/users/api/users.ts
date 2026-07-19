import { api } from "@/services/api";
import {
  postsSchema,
  type PostsType,
} from "@/features/posts/types/posts.types";
import {
  publicUserProfileSchema,
  userProfileSchema,
  type PublicUserProfile,
  type UpdateProfileDTO,
  type UserProfile,
} from "../types/users.types";

const fetchMyProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get("/users/me");
  return userProfileSchema.parse(data);
};

const fetchMyPosts = async (): Promise<PostsType> => {
  const { data } = await api.get("/users/me/posts");
  return postsSchema.parse(data);
};

const fetchSavedPosts = async (): Promise<PostsType> => {
  const { data } = await api.get("/users/me/saved");
  return postsSchema.parse(data);
};

const updateProfile = async (payload: UpdateProfileDTO): Promise<void> => {
  await api.put("/users/me", payload);
};

const fetchUserProfile = async (userId: number): Promise<PublicUserProfile> => {
  const { data } = await api.get(`/users/${userId}`);
  return publicUserProfileSchema.parse(data);
};

const fetchUserPosts = async (userId: number): Promise<PostsType> => {
  const { data } = await api.get(`/users/${userId}/posts`);
  return postsSchema.parse(data);
};

export default {
  fetchMyProfile,
  fetchMyPosts,
  fetchSavedPosts,
  updateProfile,
  fetchUserProfile,
  fetchUserPosts,
};
