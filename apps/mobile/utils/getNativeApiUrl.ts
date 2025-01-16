import { Platform } from "react-native";

export const getNativeApiUrl = () => {
  if (Platform.OS === "ios") return process.env.EXPO_PUBLIC_API_URL_IOS;
  if (Platform.OS === "android") return process.env.EXPO_PUBLIC_API_URL_ANDROID;
};
