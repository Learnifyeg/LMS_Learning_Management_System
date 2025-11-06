import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: "student" | "instructor" | "admin" | undefined;
}
interface ITokenStore {
  token: string | null;
  user: User | undefined;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearToken: () => void;
}

const useTokenStore = create<ITokenStore>()(
  persist(
    (set) => ({
      token: null,
      user: undefined,
      setToken: (token) => {
        localStorage.setItem("token", JSON.stringify(token));
        set({ token });
      },
      setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
      },
      clearToken: () => set({ token: null }),
    }),
    { name: "token-storage" }
  )
);

export default useTokenStore;
