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
  setSaveLoading: (saveLoading: boolean) => void;
  setDeleteLoading: (deleteLoading: boolean) => void;
  setModal: (appear: boolean, msg: string) => void;
  setToast: (msg: string) => void;
  setError: (msg: string) => void;
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
  setSaveLoading: (saveLoading) => set({ saveLoading }),
  setDeleteLoading: (deleteLoading) => set({ deleteLoading }),
  setModal: (modalAppear, modalMsg) => set({ modalAppear, modalMsg }),
  setToast: (msg) => set({ toasterMsg: msg }),
  setError: (msg) => set({ error: msg }),
}));
  