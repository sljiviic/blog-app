import { api } from "@/services/api";
import { saveSchema, type SaveType } from "../types/saves.types";

const createSave = async (postId: number): Promise<SaveType> => {
  const { data } = await api.post(`/posts/${postId}/save`);
  return saveSchema.parse(data);
};

const deleteSave = async (postId: number): Promise<null> => {
  await api.delete(`/posts/${postId}/save`);
  return null;
};

export default {
  createSave,
  deleteSave,
};
