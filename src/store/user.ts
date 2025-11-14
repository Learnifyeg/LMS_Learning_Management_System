import { create } from "zustand";

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: "student" | "instructor" | "admin" | undefined;
}
interface ITokenStore {
  token: string | null;
  user: User | undefined;
  setToken: (token: string | null) => void;
  setUser: (user: User | undefined) => void;
  clearToken: () => void;
}

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
const useTokenStore = create<ITokenStore>()((set) => ({
  token: tokenFromStorage ? JSON.parse(tokenFromStorage) : null,
  user:
    userFromStorage && userFromStorage !== "undefined"
      ? JSON.parse(userFromStorage)
      : undefined,
  setToken: (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearToken: () => set({ token: null, user: undefined }),
}));

export default useTokenStore;
