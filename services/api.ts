import axios from "axios";
import { getToken } from "../utils/storage";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
