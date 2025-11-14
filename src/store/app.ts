import { create } from "zustand";
import toast from "react-hot-toast";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface IAppStore {
  isLoading: boolean;
  saveLoading: boolean;
  deleteLoading: boolean;
  modalAppear: boolean;
  modalMsg: string;
  toasterMsg: string;
  toastPosition: ToastPosition;
  error: string;

  setIsLoading: (isLoading: boolean) => void;
  setSaveLoading: (saveLoading: boolean) => void;
  setDeleteLoading: (deleteLoading: boolean) => void;
  setModal: (appear: boolean, msg: string) => void;
  setToast: (msg: string, type: "success" | "error") => void;
  setToastPosition: (pos: ToastPosition) => void;
  setError: (msg: string) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  isLoading: false,
  saveLoading: false,
  deleteLoading: false,
  modalAppear: false,
  modalMsg: "",
  toasterMsg: "",
  toastPosition: "top-center", //  default position
  error: "",

  setIsLoading: (isLoading) => set({ isLoading }),
  setSaveLoading: (saveLoading) => set({ saveLoading }),
  setDeleteLoading: (deleteLoading) => set({ deleteLoading }),
  setModal: (modalAppear, modalMsg) => set({ modalAppear, modalMsg }),
  setToast: (msg, type) => {
    switch (type) {
      case "success":
        toast.success(msg, { position: useAppStore.getState().toastPosition });
        break;
      case "error":
        toast.error(msg, { position: useAppStore.getState().toastPosition });
        break;
      default:
        toast(msg, { position: useAppStore.getState().toastPosition });
        break;
    }
    set({ toasterMsg: msg });
  },

  setToastPosition: (toastPosition) => set({ toastPosition }),
  setError: (msg) => set({ error: msg }),
}));
