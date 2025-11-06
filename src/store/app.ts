import { create } from "zustand";

interface IAppStore {
  isLoading: boolean;
  saveLoading: boolean;
  deleteLoading: boolean;
  modalAppear: boolean;
  modalMsg: string;
  toasterMsg: string;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setToast: (msg: string) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  isLoading: false,
  saveLoading: false,
  deleteLoading: false,
  modalAppear: false,
  modalMsg: "",
  toasterMsg: "",
  error: "",
  setIsLoading: (isLoading) => set({ isLoading }),
  setToast: (msg) => set({ toasterMsg: msg }),
}));
