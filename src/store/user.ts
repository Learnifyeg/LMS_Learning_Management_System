import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<ITokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    { name: "token-storage" }
  )
);

export default useTokenStore;
