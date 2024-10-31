import { type IUser } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: IUser) => {
        set({ user });
      },

      isLoggedIn: false,
      login: () => {
        set({ isLoggedIn: true });
      },
      logout: () => {
        set({ isLoggedIn: false, user: null });
      },
    }),
    {
      name: "userResponseStorage",
    },
  ),
);
