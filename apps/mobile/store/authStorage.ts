import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { IUser } from "@repo/types/userType";
import { LoginData, Message } from "@repo/ui/src/types/WebViewMessageTypes";
import { stringifyJson } from "@repo/ui/src/utils/stringifyJson";

export const getAuthData = async () => {
  const [accessToken, userStr] = await Promise.all([AsyncStorage.getItem("accessToken"), AsyncStorage.getItem("user")]);

  return {
    accessToken,
    user: userStr ? JSON.parse(userStr) : null,
  };
};

export const setAuthData = async ({ accessToken, user }: LoginData) => {
  await Promise.all([
    AsyncStorage.setItem("accessToken", accessToken),
    AsyncStorage.setItem("user", stringifyJson(user)),
  ]);
};

export const clearAuthData = async () => {
  await Promise.all([AsyncStorage.removeItem("accessToken"), AsyncStorage.removeItem("user")]);
};

export const handleAuthStorage = async ({ type, data }: Message<LoginData>) => {
  switch (type) {
    case WEBVIEW_MESSAGE_TYPES.SIGN_IN_SUCCESS:
      const { user, accessToken } = data;
      await setAuthData({ accessToken, user });
      break;
    case WEBVIEW_MESSAGE_TYPES.SIGN_OUT_SUCCESS:
      await clearAuthData();
      break;
  }
};
