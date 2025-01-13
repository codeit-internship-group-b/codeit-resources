import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import type { WebviewLoginMessageHandler } from "@ui/src/types/WebviewMessageTypes";

const webviewLoginBridge = new Map<string, WebviewLoginMessageHandler>();

webviewLoginBridge.set(WEBVIEW_MESSAGE_TYPES.SIGN_IN_SUCCESS, async (data) => {
  const { user, accessToken } = data;

  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("user", JSON.stringify(user));
});

webviewLoginBridge.set(WEBVIEW_MESSAGE_TYPES.SIGN_OUT_SUCCESS, async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("user");
});

export default webviewLoginBridge;
