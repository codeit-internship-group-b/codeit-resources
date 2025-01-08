import { type IUser } from "@repo/types";
import { deleteCookie, setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreParams {
  user: IUser | null;
  isLoggedIn: boolean;
  login: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStoreParams>(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user: IUser, accessToken: string) => {
        set({ isLoggedIn: true, user });
        setCookie("accessToken", accessToken);

        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "LOGIN_SUCCESS",
            data: { user, accessToken },
          }),
        );
      },
      logout: () => {
        set({ isLoggedIn: false, user: null });
        deleteCookie("accessToken");

        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "LOGIN_SUCCESS",
            data: null,
          }),
        );
      },
    }),
    {
      name: "userResponseStorage",
    },
  ),
);
