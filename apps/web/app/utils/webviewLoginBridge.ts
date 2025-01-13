import type { WebviewLoginMessageHandler } from "@ui/src/types/WebviewMessageTypes";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { validateToken } from "@/api/auth";
import { useAuthStore } from "../store/useAuthStore";

const webviewLoginBridge = new Map<string, WebviewLoginMessageHandler>();

webviewLoginBridge.set(WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN, async (data) => {
  const { login } = useAuthStore();
  const { user, accessToken } = data;

  const isValidToken = await validateToken(accessToken);

  if (isValidToken) {
    login(user, accessToken);
  }
});

export default webviewLoginBridge;
