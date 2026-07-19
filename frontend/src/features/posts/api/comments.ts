import { api } from "@/services/api";
import { commentSchema, type CommentType } from "../types/comments.types";

const createComment = async ({
  postId,
  comment,
}: {
  postId: number;
  comment: string;
}): Promise<CommentType> => {
  const { data } = await api.post(`/posts/${postId}/comment`, { comment });
  return commentSchema.parse(data);
};

const deleteComment = async (postId: number): Promise<null> => {
  await api.delete(`/posts/${postId}/comment`);
  return null;
};

export default {
  createComment,
  deleteComment,
};
