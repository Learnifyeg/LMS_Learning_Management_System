// import { refreshAccessToken } from "@/store/RefreshAccessToken";
import useTokenStore from "@/store/user";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // ✅ important to send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

const RefreshTokenEndpoint = "Auth/refresh-token";
api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else console.log("no token available");
  return config;
});
console.log("from token")
api.interceptors.response.use(
  (response) => {
    // ✅ this runs for successful responses
    return response;
  },
  async (error) => {
    console.log("from response error interceptor", error);

    if (error.response?.status === 401) {
      console.log("error.response?.statukkks", error.response?.status);
      try {
        // const res = await api.post(RefreshTokenEndpoint,{}); // cookie sent automatically
        const res = await api.post("Auth/refresh-token", null, { withCredentials: true });
        console.log("from refresh token the new access token 777is", res);

        const newToken = res.data.token;
        useTokenStore.getState().setToken(newToken);

        // retry original request with new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (err) {
        console.log("from refresh token the new access token is failed", err);
        useTokenStore.getState().clearToken();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
