import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WebviewMessageType, WebviewLoginMessageHandler } from "@ui/src/types/WebviewMessageTypes";

const webviewLoginBridge = new Map<WebviewMessageType, WebviewLoginMessageHandler>();

webviewLoginBridge.set("LOGIN_SUCCESS", async (data) => {
  const { user, accessToken } = data;

  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("user", JSON.stringify(user));
});

webviewLoginBridge.set("LOGOUT_SUCCESS", async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("user");
});

export default webviewLoginBridge;
