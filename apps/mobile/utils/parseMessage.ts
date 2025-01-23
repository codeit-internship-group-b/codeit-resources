import { WebViewMessageEvent } from "react-native-webview";

export const parseMessage = (e: WebViewMessageEvent) => {
  return JSON.parse(e.nativeEvent.data);
};
