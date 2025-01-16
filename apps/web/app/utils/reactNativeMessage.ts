import { isAndroid, isIOS } from "react-device-detect";
import type { Message, LoginData } from "@ui/src/types/WebviewMessageTypes";
import webviewMessageBridge from "./webviewLoginBridge";

export const getMessagesFromNative = (): void => {
  if (!window.ReactNativeWebView) return;

  const listener = (event: Event): void => {
    const { type, data } = JSON.parse((event as MessageEvent<string>).data) as Message<LoginData>;
    const handler = webviewMessageBridge.get(type);

    if (handler && data.accessToken) {
      void handler(data);
    }
  };

  if (isIOS) {
    window.addEventListener("message", listener);
  } else if (isAndroid) {
    document.addEventListener("message", listener);
  }
};

export const sendMessageToNative = <T>({ type, data }: Message<T>): void => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
  }
};
