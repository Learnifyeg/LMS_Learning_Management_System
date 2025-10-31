import useTokenStore from "@/store/user";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

const RefreshTokenEndpoint = "Auth/refresh-token";

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("no token available");
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("from response error interceptor", error);

    if (error.response?.status === 401) {
      try {
        // Try refreshing the token
        const res = await api.post(RefreshTokenEndpoint, null, {
          withCredentials: true,
        });

        console.log("New token received:", res.data.token);
        const newToken = res.data.token;

        // Update Zustand store
        useTokenStore.setState({ token: newToken });

        // Retry the original request with new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (err) {
        console.log("Refresh token failed:", err);

        // Clear stored token and redirect to login page
        useTokenStore.setState({ token: null });
        window.location.href = "/User/Login"; // direct redirect (safe outside React)

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
