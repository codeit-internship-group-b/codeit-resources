import AsyncStorage from "@react-native-async-storage/async-storage";

export type WebViewMessageType = "LOGIN_SUCCESS" | "LOGOUT_SUCCESS" | "LOGIN_ERROR";

type MessageHandler = (data: { user: object; accessToken: string; message: string }) => void | Promise<void>;

const messageHandler = new Map<WebViewMessageType, MessageHandler>();

messageHandler.set("LOGIN_SUCCESS", async (data) => {
  const { user, accessToken } = data;

  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("user", JSON.stringify(user));
});

messageHandler.set("LOGOUT_SUCCESS", async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("user");
});

messageHandler.set("LOGIN_ERROR", (data) => {
  const { message } = data;
  console.error("로그인 에러:", message);
});

export { messageHandler };
