import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { type LoginData } from "@repo/ui/src/types/WebViewMessageTypes";
import { useAuthStore } from "./useAuthStore";

export const updateWebViewAuthStore = (type: string, data: LoginData): void => {
  const { user, accessToken } = data;
  if (!data.accessToken) return;

  if (type === WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN) {
    useAuthStore.getState().login(user, accessToken);
  }
};
