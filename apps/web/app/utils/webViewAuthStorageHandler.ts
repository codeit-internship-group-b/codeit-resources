import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { type LoginData } from "@repo/ui/src/types/WebViewMessageTypes";
import { useAuthStore } from "../store/useAuthStore";

export const handleWebViewAuthStore = (type: string, data: LoginData): void => {
  switch (type) {
    case WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN: {
      const { user, accessToken } = data;

      useAuthStore.getState().login(user, accessToken);
      break;
    }
  }
};
