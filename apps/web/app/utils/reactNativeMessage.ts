import { isAndroid, isIOS } from "react-device-detect";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import type { Message, LoginData } from "@ui/src/types/WebviewMessageTypes";
import webviewMessageBridge from "./webviewLoginBridge";

export const getMessagesFromNative = (): void => {
  if (!window.ReactNativeWebView) return;

  const listener = (event: Event): void => {
    const { type, data } = JSON.parse((event as MessageEvent<string>).data) as Message<LoginData>;
    const handler = webviewMessageBridge.get(type);

    if (handler) {
      void handler(data);
    }
  };

  if (isAndroid) {
    document.addEventListener("message", listener);
  }
  if (isIOS) {
    window.addEventListener("message", listener);
  }

  webviewMessageBridge.get(WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN);
};

export const sendMessageToNative = <T>({ type, data }: Message<T>): void => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
  }
};
