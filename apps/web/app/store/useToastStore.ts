import { create } from "zustand";

interface ToastState {
  message: string | null;
  duration: number;
  isVisible: boolean;
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  duration: 3000,
  isVisible: false,
  showToast: (message, duration = 3000) => {
    set({ message, duration, isVisible: true });
  },
  hideToast: () => {
    set({ isVisible: false, message: null });
  },
}));

export default useToastStore;

export const showToast = (message: string, duration?: number): void => {
  useToastStore.getState().showToast(message, duration);
};
