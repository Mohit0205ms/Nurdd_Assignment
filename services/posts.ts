import { api } from "./api";
import { Post } from "../types/post";

export const fetchPostsApi = async () => {
  const res = await api.get<Post[]>("/posts");
  return res.data;
};

export const fetchPostApi = async (id: number) => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const createPostApi = async (body: Partial<Post>) => {
  const res = await api.post("/posts", body);
  return res.data;
};

export const updatePostApi = async (id: number, body: Partial<Post>) => {
  const res = await api.put(`/posts/${id}`, body);
  return res.data;
};
