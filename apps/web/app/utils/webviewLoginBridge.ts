import type { WebviewLoginMessageHandler } from "@ui/src/types/WebviewMessageTypes";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { useAuthStore } from "../store/useAuthStore";

const webviewLoginBridge = new Map<string, WebviewLoginMessageHandler>();

webviewLoginBridge.set(WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN, (data) => {
  const { user, accessToken } = data;

  useAuthStore.getState().login(user, accessToken);
});

export default webviewLoginBridge;
