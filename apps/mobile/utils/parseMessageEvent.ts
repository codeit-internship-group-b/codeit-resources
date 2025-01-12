import { WebViewMessageEvent } from "react-native-webview";

export const parseMessageEvent = (e: WebViewMessageEvent) => {
  return JSON.parse(e.nativeEvent.data);
};
