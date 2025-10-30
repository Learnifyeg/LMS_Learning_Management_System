import useTokenStore from "@/store/user";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token; // get token from Zustand store
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
