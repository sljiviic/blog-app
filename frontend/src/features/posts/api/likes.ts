import { api } from "@/services/api";
import { likeSchema, type LikeType } from "../types/likes.types";

const createLike = async (postId: number): Promise<LikeType> => {
  const { data } = await api.post(`/posts/${postId}/like`);
  return likeSchema.parse(data);
};

const deleteLike = async (postId: number): Promise<null> => {
  await api.delete(`/posts/${postId}/like`);
  return null;
};

export default {
  createLike,
  deleteLike,
};
