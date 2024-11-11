// stores/useToastStore.ts
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
    // 자동으로 Toast를 숨깁니다
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

// notify 함수를 내보냅니다
export const notify = (type: "success" | "error" | "info", message: string, duration?: number): void => {
  useToastStore.getState().showToast(type, message, duration);
};
