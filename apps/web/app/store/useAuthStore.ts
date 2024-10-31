import { type AuthStore, type IUser } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user: IUser) => {
        set({ isLoggedIn: true, user });
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
