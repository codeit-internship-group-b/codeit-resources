import { create } from "zustand";

interface ToastState {
  type: "success" | "error" | "info" | null;
  message: string | null;
  duration: number;
  isVisible: boolean;
  showToast: (type: "success" | "error" | "info", message: string, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  type: null,
  message: null,
  duration: 1000,
  isVisible: false,
  showToast: (type, message, duration = 1000) => {
    set({
      type,
      message,
      duration,
      isVisible: true,
    });
    setTimeout(() => {
      set({ isVisible: false, message: null, type: null });
    }, duration);
  },
  hideToast: () => {
    set({
      isVisible: false,
      message: null,
      type: null,
    });
  },
}));

export const notify = (type: "success" | "error" | "info", message: string, duration?: number): void => {
  useToastStore.getState().showToast(type, message, duration);
};
