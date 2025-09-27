import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  email: string;
  fullName: string;
  phoneNumber?: string;
  role?: string;
  token?: string; // JWT
}

interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: {
        email: "",
        fullName: "",
        phoneNumber: "",
        role: "",
      },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: { email: "", fullName: "", phoneNumber: "", role: "" },
        }),
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);

export default useUserStore;
